import React from 'react'
import Footer from './Footer'
import About from './Landing/About'
import Contact from './Landing/Contact'
import Header from './Landing/Header'
import Testimonials from './Landing/Testimonials'


const Home = () => {
    return (
        <>
            <Header />
            <About />
            <Testimonials />
            <Contact />
            {/* <Footer /> */}
            <div id="go-top">
                <a className="smoothscroll" title="Back to Top" href="#home">
                    <i className="icon-up-open"></i>
                </a>
            </div>
        </>
    )
}

export default Home