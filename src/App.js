import React from "react";
import { Route, Routes } from 'react-router-dom';
import Footer from "./Components/Footer";
import "./App.css";
import Home from "./Components/Home";
import UploadImage from "./Components/FindMissing/UploadImage";
// import VideoInput from "./Components/VideoInput";
import VideoDetect from "./Components/FindMissing/VideoDetect";
import Report from "./Components/Report/Report";

const App = () => {



  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/capture" element={<UploadImage />} />
          {/* <Route exact path="/video" element={<VideoInput />} /> */}
          <Route exact path='/video' element={<VideoDetect />} />
          <Route exact path='/report' element={<Report />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
