import React from 'react';
import BlcNavbar from "../components/BlcNavbar";
import {Container} from "@mui/material";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";

const Analysis = () => {
    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="title">
                    <h1>Please choose one or more analyzes</h1>
                </div>
                <div className="analysis-boxes">
                    <Link to="/analysin">
                        <div className="analysis-box rgb-gray">
                            <h1>General clinical analysis of blood</h1>
                            <p>This analysis will show if there is anemia, blood diseases, inflammatory processes, it can be used to judge the state of immunity, the presence of allergic reactions.</p>
                        </div>
                    </Link>

                    <Link to="/analysin">
                        <div className="analysis-box rgb-blue">
                            <h1>Urinalysis to assess the function of the genitourinary system</h1>
                            <p>Sugar or acetone in the urine may indicate diabetes</p>
                        </div>
                    </Link>

                    <Link to="/analysin">
                        <div className="analysis-box rgb-gray">
                            <h1>Examination by an ophthalmologist</h1>
                            <p>With checking visual acuity, eye pressure, condition of the fundus. The doctor will evaluate if there is glaucoma or cataracts.</p>
                        </div>
                    </Link>

                    <Link to="/analysin">
                        <div className="analysis-box rgb-blue">
                            <h1>For women</h1>
                            <p>Examination by a gynecologist with taking smears, and a mammologist for diagnosing the mammary glands. Performing ultrasound of the mammary glands and pelvic organs, and after 40 years - mammography.</p>
                        </div>
                    </Link>
                </div>
            </Container>
            <Footer />
        </div>
    )
};

export default Analysis;