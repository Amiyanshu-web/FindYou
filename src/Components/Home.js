import React from 'react'
import Footer from './Footer'
import About from './Landing/About'
import Contact from './Landing/Contact'
import Header from './Landing/Header'
import Trivia from './Landing/Trivia'
// import Testimonials from './Landing/Trivia'


const Home = () => {
    return (
        <>
            <Header />
            <About />
            <Trivia />
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