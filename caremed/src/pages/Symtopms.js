import React from 'react';
import BlcNavbar from "../components/BlcNavbar";
import Footer from "../components/Footer";
import {Container} from "@mui/material";
import SymptomBoxes from "../components/SymptomBoxes";

const Symtopms = () => {
    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="title">
                    <h1>Please select one or more of the following symptoms</h1>
                </div>

                <SymptomBoxes />

                <Footer />
            </Container>
        </div>
    )
};

export default Symtopms;