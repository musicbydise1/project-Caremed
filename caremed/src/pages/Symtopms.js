import React from 'react';
import BlcNavbar from "../components/BlcNavbar";
import Footer from "../components/Footer";
import {Container} from "@mui/material";
import SymptomBoxes from "../components/SymptomBoxes";
import {useTranslation} from "react-i18next";

const Symtopms = () => {
    const { t } = useTranslation();
    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="title">
                    <h1>{t("symptomsPage.title")}</h1>
                </div>

                <SymptomBoxes />

                <Footer />
            </Container>
        </div>
    )
};

export default Symtopms;