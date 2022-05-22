import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
// import { createMatcher } from './api/face';
import { createMatcher } from '../api/face';
import Navigation from "./Navigation";
// import { SquircleLoader } from "react-awesome-loaders";


const JSON_PROFILE = require('../descriptors/bnk48.json');

const Imagedetect = ({ image }) => {
    const { url } = image;
    // const [faces, setFaces] = useState([]);
    const [friends, setFriends] = useState(null);
    const [faceInfo, setFaceInfo] = useState(null);
    const imgRef = useRef();
    const canvasRef = useRef();
    const width = 400;
    const height = 400;
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState(null);
    const [copy, setCopy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
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
        var obj = JSON.parse(JSON.stringify(detections[0].descriptor));
        var values = Object.keys(obj).map(function (key) { return obj[key]; });
        // console.log(JSON.stringify(values));
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
        setFriends(faceMatches[0]._label);
        setLoading2(false);
    };




    const enter = () => {

        const ctx = canvasRef.current.getContext("2d");
        ctx.lineWidth = 5;
        ctx.strokeStyle = "yellow";
        // faces.detection.map((face) => ctx.strokeRect(...face));
    };







    return (
        <>
            <Navigation />
            {loading ? /*<SquircleLoader />*/ <h1>Loading....</h1> : (

                <div className="detectImage">
                    <div className="container">
                        <div className="left" style={{ width, height }}>
                            <img ref={imgRef} style={{ width, height }} crossOrigin="anonymous" src={url} alt="" />
                            <canvas
                                onMouseEnter={enter}
                                ref={canvasRef}
                                width={width}
                                height={height}
                            />

                        </div>
                        {/* {gender != null ?
                            <div className="right">


                                <h1>Loading...</h1>
                            </div>
                            : ( */}
                        {!loading &&
                            <div className="right">

                                <h1>MISSING PERSON INFO</h1>

                                {friends != 'unknown' ? (
                                    <div>
                                        <table class="table table-hover">
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
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="not-found">
                                        <h3 className="px-2">Sorry!! No Such Missing Person Exist in our database. </h3>
                                        <p>If you have any information concerning this case, please contact  at<br /> +(91) 6462879071 or email us at help@findyou.com. You may also contact your local FBI office, the nearest Police Station or Consulate.</p>
                                        {/* <p>{copy.map((c, i) => <span key={i}>{c},</span>)}</p> */}
                                    </div>


                                )}
                                {/* )} */}


                            </div>
                        }


                        {/* )} */}
                    </div>
                </div>
            )}

        </>

    );
};

export default Imagedetect;