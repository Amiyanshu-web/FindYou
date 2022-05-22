import React from "react";
import { useNavigate } from "react-router-dom";


const About = () => {
  const history = useNavigate();
  const handleUpload = () => {
    history('/capture');
  }
  const handleCamera = () => {
    history('/video');
  }
  var profilepic = process.env.PUBLIC_URL + "/images/logo.jpg";
  return (
    <section id="about">
      <div className="row">
        <div className="four columns">
          <img
            className="profile-pic"
            src={profilepic}
            alt="Missing Finder"
          />
        </div>
        <div className="eight columns main-col">
          <h2 >What is FindYou ?</h2>

          <p>FindYou is a people search engine site that helps you to discover people most important and relevant to your life.<br />
            {/* <p>With the help of Facial Recognition we seek to provide the details of the missing one if found in our database.<br /> */}
            Entering details of the person like height, age, etc is a lengthy process and the search output is not efficient.<br />

            So to avoid this ambiguity we use image processing technique here, a person can upload a picture or show the video of whose information is to be known.

            <br /> This Image will be mapped or compared with the images in the database and case details status etc can be displayed.

            <br />The time efficiency is more and output is also efficient.</p>

          <div className="row">

            <div className=" columns download">
              <p>
                <button className="button" onClick={handleUpload}>
                  <i className="fa fa-upload"></i>Upload Image
                </button>
              </p>

            </div>
            <div className="columns download">
              <p>
                <button className="button" onClick={handleCamera}>
                  {/* <i className="fa fa-camera-web"></i>Open Webcam */}
                  <i className="fa fa-camera-retro"></i>Open Webcam
                  {/* <i className="fa-solid fa-camera-web">Open Webcam</i> */}
                </button>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
