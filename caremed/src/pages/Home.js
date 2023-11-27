import React from 'react';
import {Container} from "@mui/material";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-back">
            <div className="dark">
                <Container>
                    <div className="home-text">
                    <div className="home-h">
                        <h1>The “CareMed Assistant” platform was created for you to make your work easier and increase the accuracy of diagnosis predictions. Choose the most convenient option for you</h1>
                    </div>
                    <div className="home-btn">
                        <a href="/symptoms">
                            <input type="button" value="Check by symptoms"/>
                        </a>
                        <div className="line-1"></div>
                        <a href="/analysis">
                            <input type="button" value="Check by analysis"/>
                        </a>
                    </div>
                </div>
                    <div className="home-blocks">
                        <div className="home-block">
                            <p>100% accuracy of diagnosis predictions</p>
                        </div>

                        <div className="home-block">
                            <p>Ultra-fast results</p>
                        </div>

                        <div className="home-block">
                            <p>Ability to register a customer base</p>
                        </div>

                        <div className="home-block">
                            <p>Full description of the diagnosis, causes and treatments</p>
                        </div>
                        <div className="line-2"></div>
                    </div>


                </Container>

            </div>
        </div>
        </div>
    )
};

export default Home;