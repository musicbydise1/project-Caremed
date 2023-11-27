import React, { useState } from 'react';
import BlcNavbar from "../../components/BlcNavbar";
import {Container} from "@mui/material";
import "../../assets/styles/AuthStyle.css"
import axios from "axios";

const Login = () => {


    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="log">
                <div className="log-title">
                    <h1>Log in</h1>
                    <form className="form" action="">
                        <div className="form-input">
                            <input type="email" placeholder="E-mail address"/>
                            <input type="password" placeholder="Password"/>
                        </div>

                        <div className="log-btn">
                            <input type="submit" value="Log in"/>
                        </div>
                        <div className="log-nav">
                            <p>Don’t have an account?<a href="/signin"> Create one!</a></p>
                        </div>
                    </form>
                </div>
            </div>
            </Container>
        </div>
    )
};

export default Login;