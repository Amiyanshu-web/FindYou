import React from 'react'
import {Link} from 'react-router-dom'


const Navigation = () => {
    return (
        <>
            <nav id="nav-wrap">
                <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                    Show navigation
                </a>
                <a className="mobile-btn" href="#home" title="Hide navigation">
                    Hide navigation
                </a>

                <ul id="nav" className="nav">
                    <a href='/' className="logoname">FINDYOU</a>

                    <li className="current">
                        {/* <a className="smoothscroll" href="/capture">
                            Image
                        </a> */}
                        <Link to = '/capture'> Image </Link>
                    </li>
                    <li className='current'>
                        {/* <a className="smoothscroll" href="/video">
                            Video
                        </a> */}
                        <Link to = '/video'> Video </Link>

                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation