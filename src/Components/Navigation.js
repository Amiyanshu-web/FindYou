import React from 'react'

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
                    <div className='banner'><b>FINDYOU</b></div>
                    <li className="current">
                        <a className="smoothscroll" href="/capture">
                            Image
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="/video">
                            Video
                        </a>
                    </li>



                </ul>
            </nav>
        </>
    )
}

export default Navigation