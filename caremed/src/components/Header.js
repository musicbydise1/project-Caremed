import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";
import Login from "../pages/auth/Login";
import SignIn from "../pages/auth/SignIn";
import Patients from "../pages/Patients";
import PatientRegistration from "../pages/PatientRegistration";
import Symtopms from "../pages/Symtopms";
import Analysis from "../pages/Analysis";
import Results from "../pages/Results";
import AnalysInput from "../pages/AnalysInput";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import AdminPanel from "../components/admin/AdminPanel";
import Categories from "../pages/admin/Categories";
import Symptoms from "../pages/admin/Symptoms";
import AnalysCategories from "../pages/admin/AnalysCategories";
import AnalysIndicators from "../pages/admin/AnalysIndicators";
import Diagnos from "../pages/admin/Diagnos";

const Header = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path= "/" element = {<Welcome />} />
                    <Route exact path= "/home" element = {<Home />} />
                    <Route exact path= "/login" element = {<Login />} />
                    <Route exact path= "/signin" element = {<SignIn />} />
                    <Route exact path= "/patients" element = {<Patients />} />
                    <Route exact path= "/pat-reg" element = {<PatientRegistration />} />
                    <Route exact path= "/symptoms" element={<Symtopms />} />
                    <Route exact path= "/analysis" element={<Analysis />} />
                    <Route exact path="/results" element={<Results />} />
                    <Route exact path="/analysin" element={<AnalysInput />} />
                    <Route path="/admin" element={<AdminPanel />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="users" element={<Users />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="symptoms" element={<Symptoms />} />
                        <Route path="analys-categories" element={<AnalysCategories />} />
                        <Route path="analys-indicators" element={<AnalysIndicators />} />
                        <Route path="diagnos" element={<Diagnos />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
};

export default Header;