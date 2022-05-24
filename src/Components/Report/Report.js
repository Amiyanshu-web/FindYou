import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Navigation from '../Navigation';
import ReportNav from './ReportNav';

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
            // navigate to home page
            navigate('/')
        }).catch(err => {
            console.log(err)
        }
        )


    }
    return (
        //     <div className='maiiin'>
        //         <div className="content">
        //             <h1 style={{ color: "red", textShadow: "none", textDecoration: "underline", fontWeight: "200", margin: 0 }}>Report Missing</h1>
        //             <Form onSubmit={submitHandler}>
        //                 <Form.Group controlId="name">
        //                     <Form.Label>Name</Form.Label>
        //                     <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        //                 </Form.Group>

        //                 <Form.Group controlId="age">
        //                     <Form.Label>Age</Form.Label>
        //                     <Form.Control type="age" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
        //                 </Form.Group>
        //                 <Form.Group controlId='image'>
        //                     <Form.Label>Image</Form.Label>
        //                     <Form.Control
        //                         type='' url
        //                         placeholder='Enter Image url'
        //                         value={selectImage}
        //                         onChange={(e) => setSelectImage(e.target.value)}
        //                     ></Form.Control>

        //                     <Form.Control
        //                         type='file'
        //                         placeholder='Choose file'

        //                         onChange={(e) => handleImage(e.target.files[0])}
        //                     ></Form.Control>
        //                 </Form.Group>
        //                 <Form.Group>
        //                     <Form.Label>Identification</Form.Label>
        //                     <Form.Control as="textarea" rows="3" value={identification} onChange={(e) => setIdentification(e.target.value)} />

        //                 </Form.Group>
        //                 <Button type='submit' variant='primary'>
        //                     Report
        //                 </Button>
        //             </Form>
        //         </div>

        //     </div >
        <>
            {/* <Navigation /> */}
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
                                        placeholder='Enter Image url'
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

                                <div>
                                    <button type="submit" className="submit" onClick={submitHandler}>
                                        Send
                                    </button>
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