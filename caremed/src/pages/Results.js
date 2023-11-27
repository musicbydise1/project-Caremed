import React from 'react';
import BlcNavbar from "../components/BlcNavbar";
import Footer from "../components/Footer";
import {Container} from "@mui/material";
import ResultBox from "../components/ResultBox";

const Results = () => {
    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="title">
                    <h1>Results based on symptoms</h1>
                </div>

                <ResultBox />
            </Container>

            <Footer />
        </div>
    )
};

export default Results;