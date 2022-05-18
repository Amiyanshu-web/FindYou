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
            fullDesc: null,
            detections: null,
            descriptors: null,
            faceMatcher: null,
            match: null,
            facingMode: null
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
                    this.setState({
                        detections: fullDesc.map(fd => fd.detection),
                        descriptors: fullDesc.map(fd => fd.descriptor)
                    });
                }
            });

            if (!!this.state.descriptors && !!this.state.faceMatcher) {
                let match = await this.state.descriptors.map(descriptor =>
                    this.state.faceMatcher.findBestMatch(descriptor)
                );
                this.setState({ match });
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

        return (
            <div
                className="Camera"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <p>Camera: {camera}</p>
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
                                />
                            </div>
                        ) : null}
                        {!!drawBox ? drawBox : null}
                    </div>
                </div>
            </div>


            // <>
            //     <Navigation />
            //     {/* {
            //         loading ?  <h1>Loading....</h1> : ( */}

            //     <div className="detectImage">
            //         <div className="container">
            //             <div className="left" style={{ WIDTH, HEIGHT }}>
            //                 {!!videoConstraints ? (
            //                     <div style={{ position: 'absolute' }}>
            //                         <Webcam
            //                             audio={false}
            //                             width={WIDTH}
            //                             height={HEIGHT}
            //                             ref={this.webcam}
            //                             screenshotFormat="image/jpeg"
            //                             videoConstraints={videoConstraints}
            //                         />
            //                         {!!drawBox ? drawBox : null}
            //                     </div>
            //                 ) : null}

            //             </div>

            //             <div className="right">

            //                 <h1>MISSING PERSON INFO</h1>

            //                 {!!match && !!match[0] ? (
            //                     <div>
            //                         <table class="table table-hover">
            //                             <thead>
            //                                 <tr>
            //                                     <th scope="col">#</th>
            //                                     <th colSpan={2}>Query</th>
            //                                     <th scope="col">Details</th>
            //                                 </tr>
            //                             </thead>
            //                             <tbody>
            //                                 <tr>
            //                                     <th scope="row">1</th>
            //                                     <td colSpan="2">Name</td>
            //                                     <td className="name">{match[0]._label}</td>
            //                                 </tr>
            //                                 {/* <tr>
            //                                     <th scope="row">2</th>
            //                                     <td colSpan="2">Gender</td>
            //                                     <td className="name">{gender}</td>
            //                                 </tr>
            //                                 <tr>
            //                                     <th scope="row">3</th>
            //                                     <td colspan="2">Age</td>
            //                                     <td className="name">{Math.floor(age)}</td>
            //                                 </tr> */}
            //                             </tbody>
            //                         </table>
            //                     </div>
            //                 ) : (
            //                     <div className="not-found">
            //                         <h3 className="px-2">Sorry!! No Such Missing Person Exist in our database. </h3>
            //                         <p>If you have any information concerning this case, please contact  at<br /> +(91) 6462879071 or email us at help@findyou.com. You may also contact your local FBI office, the nearest Police Station or Consulate.</p>
            //                         {/* <p>{copy.map((c, i) => <span key={i}>{c},</span>)}</p> */}
            //                     </div>


            //                 )}
            //                 {/* )} */}


            //             </div>

            //             {/* )} */}
            //         </div>
            //     </div>
            //     {/* ) */}
            //     {/* } */}
            // </>
        );

    }

}

export default VideoDetect

