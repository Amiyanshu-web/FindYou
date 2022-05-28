import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ReportNav from './ReportNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CLOUDINARY_FOLDER_NAME = 'Missing'
const CLOUDINARY_CLOUD_NAME = 'dbvg8hyac'


const Report = () => {
    const navigate = useNavigate();
    const [selectImage, setSelectImage] = React.useState("");
    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState(0);
    const [identification, setIdentification] = React.useState("");
    const handleImage = (image) => {
        // const image = e.target.files[0]
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "Missing")
        formData.append('folder', CLOUDINARY_FOLDER_NAME);
        axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData).then(res => {
            console.log(res.data.secure_url)
            setSelectImage(res.data.secure_url)
            // console.log(selectImage);
        })
        //upload to cloudinary
    }
    const submitHandler = (e) => {
        e.preventDefault();
        //axios post request
        axios.post('/api/v1/people/missing', {
            name,
            age,
            identification,
            image: selectImage
        }).then(res => {
            console.log(res.data)
            // show success message
            toast.success("Report Done!");
            // navigate to home page after 2 second
            setTimeout(() => {
                navigate('/')
            }, 2000)

            // navigate('/')
        }).catch(err => {
            console.log(err)
            // show error message
            toast.error("Some Error Occured!");
        }
        )


    }
    return (
        <>
            <ReportNav />
            <section id="report">
                <h1 style={{ textShadow: "none", color: "red", textAlign: "center" }}>REPORT MISSING</h1>
                <div className="row">
                    <div className=" eight column" >
                        <form onSubmit={submitHandler}>
                            <fieldset>
                                <div>
                                    <label htmlFor="contactName">
                                        Name
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue=""
                                        placeholder='Enter Name'
                                        value={name}
                                        size="35"
                                        name="Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="age">
                                        Age
                                        <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue=""
                                        placeholder='Enter Age'
                                        value={age}
                                        size="35"
                                        name="Age"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </div>
                                <div>
                                    {/* get image  */}
                                    <label htmlFor="image">
                                        Image
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue=""
                                        placeholder='Enter Image url / Choose file'
                                        value={selectImage}
                                        size="35"
                                        name="Image"
                                        onChange={(e) => setSelectImage(e.target.value)}
                                    />
                                    {/* file uplaod */}
                                    <input
                                        placeholder='Choose image'
                                        type="file"
                                        name="Image"
                                        onChange={(e) => handleImage(e.target.files[0])}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Identification">
                                        Identification<span className="required">*</span>
                                    </label>
                                    <textarea
                                        cols="50"
                                        rows="15"
                                        placeholder='Enter Identification marks or description'
                                        value={identification}
                                        onChange={(e) => setIdentification(e.target.value)}
                                        name="Identification"
                                        required
                                    ></textarea>
                                </div>

                                <div>{selectImage != "" ? <button className="submit" type="submit">Submit</button> : <button className="disabled" type="submit" disabled>Submit</button>}
                                    {/* <button type="submit" className="submit" disabled={load} onClick={submitHandler}>
                                        Send
                                    </button> */}
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={2000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover={false}
                                    />
                                </div>
                            </fieldset>
                        </form>


                    </div>
                </div>
            </section>
        </>

    )
}

export default Report