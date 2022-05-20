import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
// import { createMatcher } from './api/face';
import { createMatcher } from '../api/face';
import Navigation from "./Navigation";
// import { SquircleLoader } from "react-awesome-loaders";
import './Demo.css';

const JSON_PROFILE = require('../descriptors/bnk48.json');

const Demo = ({ image }) => {
    const { url } = image;
    const [faces, setFaces] = useState([]);
    const [friends, setFriends] = useState(null);
    const [faceInfo, setFaceInfo] = useState(null);
    const [date, setDate] = useState(null);
    const [location, setLocation] = useState(null);
    const [birthmark, setBirthmark] = useState(null);
    const imgRef = useRef();
    const canvasRef = useRef();
    const width = 400;
    const height = 400;
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [copy, setCopy] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const MODEL_URI = process.env.PUBLIC_URL + '/models'
        setTimeout(async () => {

            const loadModels = () => {
                Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URI),
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URI),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI),
                    faceapi.nets.ageGenderNet.loadFromUri(MODEL_URI)
                ])
                    .then(async () => {
                        await handleImage()
                    })
                    .catch((e) => console.log(e));

            };


            imgRef && loadModels();
            setLoading(false);

        }, 1000);

    }, [url]);

    const handleImage = async () => {

        console.log('Running...');
        var detections = await faceapi.detectAllFaces(
            imgRef.current,
            new faceapi.SsdMobilenetv1Options()
        ).withFaceLandmarks().withFaceExpressions().withFaceDescriptors().withAgeAndGender()
        setCopy(detections[0].descriptor);
        setAge(detections[0].age);
        setGender(detections[0].gender);
        const resizeDetections = faceapi.resizeResults(detections, {
            width: width,
            height: height

        });
        // console.log(resizeDetections[0].descriptor);

        faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);

        const faceMatcher = await createMatcher(JSON_PROFILE);
        setFaceInfo({ faceMatcher });
        // console.log(faceMatcher);
        let faceMatches = resizeDetections.map(desc => faceMatcher.findBestMatch(desc.descriptor));
        setFriends(faceMatches[0]._label);  //Amiyanshu
        setFaces(resizeDetections);
        let details = faceMatches[0]._label;
        console.log(typeof (details));
        console.log(JSON_PROFILE[details].date);
        setDate(JSON_PROFILE[details].date);
        setLocation(JSON_PROFILE[details].found);
        setBirthmark(JSON_PROFILE[details].birthmark);

    };
    // console.log(friends);




    const enter = () => {

        const ctx = canvasRef.current.getContext("2d");
        ctx.lineWidth = 5;
        ctx.strokeStyle = "yellow";
        // faces.detection.map((face) => ctx.strokeRect(...face));
    };







    return (
        <>
            <Navigation />

            <div className="detectImage">
                <div className="container">
                    <div className="left" style={{ width, height }}>
                        <img ref={imgRef} style={{ width, height }} crossOrigin="anonymous" className="missimg" src={url} alt="" />
                        <canvas
                            onMouseEnter={enter}
                            ref={canvasRef}
                            width={width}
                            height={height}
                        />

                    </div>

                    <div className="right">

                        <h1>MISSING PERSON INFO</h1>

                        {friends != 'unknown' ? (
                            <div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th colSpan={2}>Query</th>
                                            <th scope="col">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td colSpan="2">Name</td>
                                            <td className="name">{friends ? friends : 'UNKNOWN'}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td colSpan="2">Gender</td>
                                            <td className="name">{gender}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colspan="2">Age</td>
                                            <td className="name">{Math.floor(age)}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td colspan="2">Found at</td>
                                            <td className="name">
                                                {location ? <p> {location} on {date}</p> : null}
                                                {/* //convert string to date */}

                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td colspan="2">BirthMark</td>
                                            <td className="name">{birthmark} &nbsp;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="not-found">
                                <h3 className="px-2">Sorry!! No Such Missing Person Exist in our database. </h3>
                                <p id='nouser'>If you have any information concerning this case, please contact  at +(91) 6462879071 or email us at help@findyou.com. You may also contact your local FBI office, the nearest Police Station or Consulate.</p>

                            </div>


                        )}



                    </div>


                </div>
            </div>


            {/* <h1>Missing Person Info</h1>
            <div className="card_wrapper">
                <div className="column">
                    <div className="image_wrapper">
                        <img ref={imgRef} style={{ width, height }} crossOrigin="anonymous" src={url} alt="image" />
                        <canvas
                            onMouseEnter={enter}
                            ref={canvasRef}
                            width={width}
                            height={height}
                        />
                    </div>
                </div>
                <div className="column">
                    <h2 className="h2">{friends}</h2>
                    <h3>{gender}</h3>
                    <p>Lorem ipsum dolor sit amet, illum definitiones no quo, maluisset concludaturque et eum, altera fabulas ut quo. Atqui causae gloriatur ius te, id agam omnis evertitur eum. Affert laboramus repudiandae nec et.</p>
                    <a href=""><button className="btn">Go To Website</button></a>
                </div>
            </div> */}

        </>

    );
};

export default Demo;