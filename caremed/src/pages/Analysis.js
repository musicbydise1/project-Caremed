import React, { useState, useEffect } from 'react';
import BlcNavbar from "../components/BlcNavbar";
import { Container } from "@mui/material";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from 'axios';

const Analysis = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${apiUrl}/analys-category/show/all`);
            setCategories(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке аналитических категорий:', error);
        }
    };

    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="title">
                    <h1>Please choose one or more analyzes</h1>
                </div>
                <div className="analysis-boxes">
                    {categories.map(category => (
                        <Link key={category.id} to={`/analysis/${category.id}`}>
                            <div className={`analysis-box ${category.color}`}>
                                <h1>{category.name}</h1>
                                <p>{category.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default Analysis;
