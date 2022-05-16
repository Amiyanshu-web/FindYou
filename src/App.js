import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Testimonials from "./Components/Testimonials";
import Portfolio from "./Components/Portfolio";
import ContactForm from "./Components/ContactForm";
import "./App.css";
import Home from "./Home";

const App = () => {

  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((data) => {
        setResumeData(data);
      });
  }, []);

  return (
    // <div className="App">
    //   <Header />
    //   <About data={resumeData.main} />
    //   <Testimonials data={resumeData.testimonials} />
    //   <Contact data={resumeData.main} />
    //   {/* <ContactForm /> */}
    //   <Footer data={resumeData.main} />


    // </div>
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<About />} />
        <Route path="/" element={<Testimonials />} />
        <Route path="/" element={<Footer />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
