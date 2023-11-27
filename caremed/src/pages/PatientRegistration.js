import React from 'react';
import BlcNavbar from "../components/BlcNavbar";
import Footer from "../components/Footer";
import {Container} from "@mui/material";

const PatientRegistration = () => {
    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="title">
                    <h1>Fill the information about patients</h1>
                </div>

                <form action="">
                    <div className="patients-reg-boxes">
                        <div className="patients-reg-box">
                            <input type="text" placeholder="First name"/>
                            <input type="text" placeholder="Last name"/>
                            <input type="text" placeholder="Surname"/>
                            <input type="number" placeholder="Age"/>
                            <input type="text" placeholder="Address"/>
                        </div>

                        <div className="patients-reg-box">
                            <input type="text" placeholder="Gender"/>
                            <input type="text" placeholder="Blood type"/>
                            <input type="email" placeholder="E-mail address"/>
                            <input type="number" placeholder="Phone number"/>
                            <input type="text" placeholder="Diagnosis"/>
                        </div>
                    </div>
                </form>
                <div className="patients-reg-btn">
                    <input type="submit" value="Register"/>
                </div>

                <Footer />
            </Container>
        </div>
    )
};

export default PatientRegistration;