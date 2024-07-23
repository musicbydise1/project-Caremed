import React, { useState } from 'react';
import {Container} from "@mui/material";
import "../../assets/styles/AuthStyle.css"
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const apiUrl = process.env.REACT_APP_API_URL;


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Отправляем данные на сервер
            console.log(formData)
            const response = await axios.post(`${apiUrl}/auth/signin`, formData);

            // Обработка успешного ответа от сервера
            console.log('Успешно аутентифицирован:', response.data);

            // Проверяем, есть ли у пользователя роль администратора
            console.log(response.data.roles[0] === 'ROLE_ADMIN');

            // Перенаправляем пользователя в зависимости от его роли
            if (response.data.roles[0] === 'ROLE_ADMIN') {
                // Если пользователь администратор, перенаправляем его на страницу админки
                navigate('/admin');
            }
            else {
                // Если пользователь не администратор, перенаправляем его на домашнюю страницу
                navigate('/home');
            }
        } catch (error) {
            // Обработка ошибок
            console.error('Ошибка регистрации:', error);
        }
    };




    return (
        <div>
            <div style={{ marginTop: "205px" }}>

            </div>
            <Container>
                <div className="log">
                <div className="log-title">
                    <h1>Log in</h1>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-input">
                            <input type="email" name="email" onChange={handleChange} placeholder="E-mail address"/>
                            <input type="password" name="password" onChange={handleChange} placeholder="Password"/>
                        </div>

                        <div className="log-btn">
                            <input type="submit" value="Log in"/>
                        </div>
                        {/*<div className="log-nav">*/}
                        {/*    <p>Don’t have an account?<Link to="/signin"> Create one!</Link></p>*/}
                        {/*</div>*/}
                    </form>
                </div>
            </div>
            </Container>
        </div>
    )
};

export default Login;