import React from 'react';
import {FaWhatsapp, FaTelegram, FaFacebookF, FaInstagram } from "react-icons/fa";
import "../assets/styles/FooterStyle.css"
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Footer = () => {

    const { t} = useTranslation();

    return(
        <div className="footer">
            <div className="footer-boxes">
                <div className="footer-box">
                    <div className="form-header">
                        <h1>{t("footer.formTitle")}</h1>
                    </div>
                    <form action="">
                        <div className="footer-form">
                            <div className="footer-form-email">
                                <input type="email" placeholder={t("footer.email")}/>
                            </div>
                            <div className="footer-form-textarea">
                                <textarea name="" id="" cols="30" placeholder={t("footer.text")} rows="10"></textarea>
                            </div>
                            <div className="footer-form-btn">
                                <input type="submit" value={t("footer.send")}/>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="footer-box soc">
                    <div className="footer-nav">
                        <nav>
                            <ul>
                                <li><Link to="/home">{t("home")}</Link></li>
                                <li><Link to="/patients">{t("patients")}</Link></li>
                                <li><Link to="/pat-reg">{t("patientRegistration")}</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="footer-social">
                        <div className="social-header">
                            <h1>{t("footer.social")}</h1>
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