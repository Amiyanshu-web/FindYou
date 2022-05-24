import React from 'react'



const ReportNav = () => {
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
                        <a className="smoothscroll" href="/report">
                            Report
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default ReportNav