import React, { useState } from 'react';
import BlcNavbar from "../../components/BlcNavbar";
import {Container} from "@mui/material";
import axios from "axios";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
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
            console.log(formData)
            const response = await axios.post('http://localhost:8080/api/auth/signup', formData);

            // Обработка успешного ответа от сервера
            console.log('Успешно зарегистрированы:', response.data);
            navigate('/home')
        } catch (error) {
            // Обработка ошибок
            console.error('Ошибка регистрации:', error);
        }
    };



    return (
        <div>
            <div style={{marginTop: "100px"}}>

            </div>
            <Container>
                <div className="log reg">
                    <div className="log-title">
                        <h1>Sign in</h1>
                        <form className="form" onSubmit={handleSubmit}>
                            <div className="form-input">
                                <input type="text" name="username" onChange={handleChange} placeholder="Full name"/>
                                <input type="email" name="email" onChange={handleChange} placeholder="E-mail address"/>
                                <input type="password" name="password" onChange={handleChange}
                                       placeholder="Create password"/>
                            </div>

                            <div className="log-btn">
                                <input type="submit" value="Sign up"></input>
                            </div>
                            <div className="log-nav reg">
                                <p>Do you have an account?<Link to="/login"> Login!</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default SignIn;