import React, { Component } from 'react'
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../api/face';
import Navigation from './Navigation';


// Import face profile
const JSON_PROFILE = require('../descriptors/bnk48.json');
const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

class VideoDetect extends Component {

    constructor(props) {
        super(props);
        this.webcam = React.createRef();
        this.state = {
            fullDescripion: null,
            detections: null,
            descriptors: null,
            faceMatcher: null,
            match: null,
            facingMode: null,
            gender: null,
            age: null,
            date: null,
            location: null,
            birthmark: null

        };
    }

    componentWillMount = async () => {
        await loadModels();
        this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) });
        this.setInputDevice();
    };

    setInputDevice = () => {
        navigator.mediaDevices.enumerateDevices().then(async devices => {
            let inputDevice = await devices.filter(
                device => device.kind === 'videoinput'
            );
            if (inputDevice.length < 2) {
                await this.setState({
                    facingMode: 'user'
                });
            } else {
                await this.setState({
                    facingMode: { exact: 'environment' }
                });
            }
            this.startCapture();
        });
    };

    startCapture = () => {
        this.interval = setInterval(() => {
            this.capture();
        }, 1500);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    capture = async () => {
        if (!!this.webcam.current) {
            await getFullFaceDescription(
                this.webcam.current.getScreenshot(),

                inputSize
            ).then(fullDesc => {
                if (!!fullDesc) {
                    // console.log(fullDesc);
                    this.setState({ fullDescripion: fullDesc });
                    let obj = fullDesc[0];
                    if (obj) {
                        // console.log(obj.age);
                        this.setState({ age: obj.age, gender: obj.gender });
                    }
                    console.log(this.state.fullDescripion[0]?.gender);


                    this.setState({
                        detections: fullDesc.map(fd => fd.detection),
                        descriptors: fullDesc.map(fd => fd.descriptor),
                        // gender: fullDesc[0].gender,
                        // age: fullDesc[0].age
                    });
                }
            });

            if (!!this.state.descriptors && !!this.state.faceMatcher) {
                let match = await this.state.descriptors.map(descriptor =>
                    this.state.faceMatcher.findBestMatch(descriptor)
                );
                this.setState({ match });
                console.log(this.state.match[0]?._label);
                let obj2 = this.state.match[0];
                if (obj2) {
                    this.setState({
                        date: JSON_PROFILE[obj2._label].date,
                        location: JSON_PROFILE[obj2._label].found,
                        birthmark: JSON_PROFILE[obj2._label].birthmark

                    })
                }
                // let details = match[0]._label;
                // this.state({
                //     date: JSON_PROFILE[details].date,
                //     location: JSON_PROFILE[details].found,
                //     birthmark: JSON_PROFILE[details].birthmark

                // })
            }

        }

    };

    render() {
        const { detections, match, facingMode } = this.state;
        let videoConstraints = null;
        let camera = '';
        if (!!facingMode) {
            videoConstraints = {
                width: WIDTH,
                height: HEIGHT,
                facingMode: facingMode
            };
            if (facingMode === 'user') {
                camera = 'Front';
            } else {
                camera = 'Back';
            }
        }

        let drawBox = null;
        if (!!detections) {
            drawBox = detections.map((detection, i) => {
                let _H = detection.box.height;
                let _W = detection.box.width;
                let _X = detection.box._x;
                let _Y = detection.box._y;
                return (
                    <div key={i}>
                        <div
                            style={{
                                position: 'absolute',
                                border: 'solid',
                                borderColor: 'blue',
                                height: _H,
                                width: _W,
                                transform: `translate(${_X}px,${_Y}px)`
                            }}
                        >
                            {!!match && !!match[i] ? (
                                <p
                                    style={{
                                        backgroundColor: 'blue',
                                        border: 'solid',
                                        borderColor: 'blue',
                                        width: _W,
                                        marginTop: 0,
                                        color: '#fff',
                                        transform: `translate(-3px,${_H}px)`
                                    }}
                                >
                                    {match[i]._label}
                                </p>
                            ) : null}
                        </div>
                    </div>
                );
            });
        }
        // console.log(this.state.match);
        console.log(this.state.detections);
        return (
            <>
                <Navigation />
                <div className='maiiin'>
                    <div className="content">
                        <div className='container'>
                            <div
                                className="left"
                                style={{
                                    // display: 'flex',
                                    // flexDirection: 'column',
                                    // alignItems: 'center',
                                    HEIGHT, WIDTH
                                }}
                            >
                                {/* <p>Camera: {camera}</p> */}
                                <div
                                    style={{
                                        width: WIDTH,
                                        height: HEIGHT
                                    }}
                                >
                                    <div style={{ position: 'relative', width: WIDTH }}>
                                        {!!videoConstraints ? (
                                            <div style={{ position: 'absolute' }}>
                                                <Webcam
                                                    audio={false}
                                                    width={WIDTH}
                                                    height={HEIGHT}
                                                    ref={this.webcam}
                                                    screenshotFormat="image/jpeg"
                                                    videoConstraints={videoConstraints}
                                                    className="missimg"
                                                />
                                            </div>
                                        ) : null}
                                        {!!drawBox ? drawBox : null}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="right">
                                    <h1>MISSING PERSON INFO</h1>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th colSpan={2}>Query</th>
                                                <th scope="col">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className='row'>1</th>
                                                <td colSpan="2">Name:</td>
                                                <td className='name'>
                                                    {match ? this.state.match.map((item, i) => {
                                                        return (
                                                            <div key={i}>
                                                                {item._label}

                                                            </div>
                                                        )
                                                    }
                                                    ) : null}
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className='row'>2</th>
                                                <td colSpan="2">Age:</td>
                                                <td className='name'>{Math.floor(this.state.age)}</td>
                                            </tr>
                                            <tr>
                                                <th className='row'>3</th>
                                                <td colSpan="2">Gender:</td>
                                                <td className='name'>
                                                    {/* {this.state.fullDescripion.map(data => data.gender)} */}
                                                    {/* {this.state.fullDescripion[0]?.gender} */}
                                                    {this.state.gender}

                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td colspan="2">Found at</td>
                                                <td className="name">
                                                    {this.state.location ? <p> {this.state.location} on {this.state.date}</p> : null}
                                                    {/* //convert string to date */}

                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">5</th>
                                                <td colspan="2">BirthMark</td>
                                                <td className="name">{this.state.birthmark} &nbsp;</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>


            //

        );

    }

}

export default VideoDetect

