import React from 'react';
import {Container} from "@mui/material";
import logo from "../assets/img/blcLogo.svg"
import "../assets/styles/NavbarStyle.css"
import {FaGlobe} from "react-icons/fa";


const BlcNavbar = () => {
    return (
        <Container>
            <div className="navigation-panel">
                <nav>
                    <a href="/">
                        <img src={logo}
                             height=""
                             className="d-inline-block align-top"
                             alt="Logo"

                        />
                    </a>
                    <div>
                        <ul id="navbar" className="blc">
                            <li className="menu-li"><a href="/">Home</a></li>
                            <li className="menu-li"><a href="/patients">Patients</a></li>
                            <li className="menu-li"><a href="/pat-reg">Patients registration</a></li>
                            <li className="lang"><FaGlobe className="blc globus" size={25}></FaGlobe></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </Container>
    )
};

export default BlcNavbar;