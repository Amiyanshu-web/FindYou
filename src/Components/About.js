import React from "react";


const About = ({ data }) => {
  // const profilepic=process.env.PUBLIC_URL + "/images/logo.jpg";
  // if (data) {
  //   var name = data.name;
  //   var profilepic = "images/" + data.image;
  //   var bio = data.bio;
  //   var street = data.address.street;
  //   var city = data.address.city;
  //   var state = data.address.state;
  //   var zip = data.address.zip;
  //   var phone = data.phone;
  //   var email = data.email;
  //   var resumeDownload = data.resumedownload;
  // }
  var profilepic = process.env.PUBLIC_URL + "/images/logo.jpg";
  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img
            className="profile-pic"
            src={profilepic}
            alt="Missing Finder"
          />
        </div>
        <div className="nine columns main-col">
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
                <a className="button">
                  <i className="fa fa-upload"></i>Upload Image
                </a>
              </p>

            </div>
            <div className="columns download">
              <p>
                <a className="button">
                  {/* <i className="fa fa-camera-web"></i>Open Webcam */}
                  <i className="fa fa-camera-retro"></i>Open Webcam
                  {/* <i className="fa-solid fa-camera-web">Open Webcam</i> */}
                </a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
