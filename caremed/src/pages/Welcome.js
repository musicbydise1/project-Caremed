import React from 'react';
import {Container} from "@mui/material";

const Welcome = () => {
    return (
        <div className="welcome-back">
            <div className="welcome-dark">
                <Container>
                    <div className="home-text">
                        <div className="home-h welcome-h">
                            <h1>hello & welcome!</h1>
                            <h2>“CareMed Assistant” is a platform designed for physicians to find diagnoses accurately. To use our platform, create an account or log in to an existing one</h2>
                        </div>
                        <div className="home-btn welcome-btn">
                            <a href="/login"><input type="button" value="Log in"/></a>
                            <a href="/signin"><input type="button" value="Sign in"/></a>
                        </div>
                    </div>



                </Container>
            </div>
        </div>
    )
};

export default Welcome;