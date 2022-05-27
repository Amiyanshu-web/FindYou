import React, { useState, useEffect } from 'react'
import Imagedetect from './Imagedetect';
import Navigation from './Navigation.js';

const UploadImage = () => {
    const [file, setFile] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        //Fetching image from local storage
        const getImage = () => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setImage({
                    url: img.src,
                    width: img.width,
                    height: img.height,
                });
            };
        };

        file && getImage();
    }, [file]);
    return (
        <>
            <Navigation />
            <div className='maiiin'>
                <div className="content">
                    {image ? (
                        //If image is uploaded,redirect to Imagedetect
                        <Imagedetect image={image} />
                    ) : (
                        //If no image is uploaded, show the upload button
                        <>
                            <div className="newPostCard">
                                <div className="addPost">
                                    <div className="postForm">
                                        <h4>Drag or Click on this area to uplaod an Image</h4>
                                        <label htmlFor='file'>
                                            <i className="fa-4x fa fa-upload addImg" aria-hidden="true"></i>

                                        </label>

                                        <input
                                            onChange={(e) => setFile(e.target.files[0])}
                                            id="file"
                                            style={{ display: "none" }}
                                            type="file"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default UploadImage