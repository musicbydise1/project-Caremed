import React, { useState } from 'react';
import BlcNavbar from "../../components/BlcNavbar";
import {Container} from "@mui/material";
import axios from "axios";

const SignIn = () => {

    const [formData, setFormData] = useState({
        username: '',
        dateOfBirth: '',
        country: '',
        city: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Отправляем данные на сервер
            const response = await axios.post('http://localhost:3000/user/signup', formData);

            // Обработка успешного ответа от сервера
            console.log('Успешно зарегистрированы:', response.data);
        } catch (error) {
            // Обработка ошибок
            console.error('Ошибка регистрации:', error);
        }
    };



    return (
        <div>
            <BlcNavbar />
            <Container>
                <div className="log reg">
                    <div className="log-title">
                        <h1>Sign in</h1>
                        <form className="form" action="" onSubmit={handleSubmit}>
                            <div className="form-input">
                                <input type="text" name="username" onChange={handleChange} placeholder="Full name"/>
                                <input type="date" name="dateOfBith" onChange={handleChange} placeholder="Birth"/>
                                <select name="" id="" onChange={handleChange}>
                                    <option value="">Country</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                </select>
                                <input type="text" name="city" onChange={handleChange} placeholder="City"/>
                                <input type="email" name="email" onChange={handleChange} placeholder="E-mail address"/>
                                <input type="password" name="password" onChange={handleChange} placeholder="Create password"/>
                            </div>

                            <div className="log-btn">
                                <input type="submit" value="Sign in"/>
                            </div>
                            <div className="log-nav reg">
                                <p>Do you have an account?<a href="/login"> Login!</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default SignIn;