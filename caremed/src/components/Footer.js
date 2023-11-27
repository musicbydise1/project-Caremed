import React from 'react';
import {FaWhatsapp, FaTelegram, FaFacebookF, FaInstagram } from "react-icons/fa";
import "../assets/styles/FooterStyle.css"

const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-boxes">
                <div className="footer-box">
                    <div className="form-header">
                        <h1>Do you have any questions? We will help you</h1>
                    </div>
                    <form action="">
                        <div className="footer-form">
                            <div className="footer-form-email">
                                <input type="email" placeholder="E-mail address"/>
                            </div>
                            <div className="footer-form-textarea">
                                <textarea name="" id="" cols="30" placeholder="Text" rows="10"></textarea>
                            </div>
                            <div className="footer-form-btn">
                                <input type="submit" value="Send"/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="footer-box soc">
                    <div className="footer-nav">
                        <nav>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/patients">Patients</a></li>
                                <li><a href="/pat-reg">Patients registration</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="footer-social">
                        <div className="social-header">
                            <h1>We on social media</h1>
                        </div>
                        <div className="social-icons">
                            <FaWhatsapp className="social-icon" />
                            <FaTelegram className="social-icon" />
                            <FaFacebookF className="social-icon" />
                            <FaInstagram className="social-icon" />
                        </div>
                    </div>
                    <div className="copyright">
                        <p>Copyright by <b>CareMed</b> Assistant, 2023</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;