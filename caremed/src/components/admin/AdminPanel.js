import React from 'react';
import logo from "../../assets/img/logo.svg";
import {Link, Outlet, useNavigate} from 'react-router-dom';

const AdminPanel = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/');  // Перенаправляем пользователя на страницу welcome
    };
    return (
    <div className="flex h-screen bg-gray-800 text-white">
        <nav className="w-44 space-y-4 py-5 px-3 bg-gray-900">
            <ul>
                <div className="flex items-center justify-center">
                    <img src={logo} alt="Logo" className="h-20"/>
                </div>
                <li className="mt-[110px]">
                    <Link to="/admin/dashboard"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Users
                    </Link>
                </li>
                <li>
                    <Link to="/admin/categories"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Categories
                    </Link>
                </li>
                <li>
                    <Link to="/admin/symptoms"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Symptoms
                    </Link>
                </li>
                <li>
                    <Link to="/admin/analys-categories"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Analysis Categories
                    </Link>
                </li>
                <li>
                    <Link to="/admin/analys-indicators"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Analysis Indicators
                    </Link>
                </li>
                <li className="">
                    <Link to="/admin/diagnos"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Diagnosis
                    </Link>
                </li>
                <li className="mb-[80px]">
                    <Link to="/admin/linkdiagnoses"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Link diagnosis
                    </Link>
                </li>
                <div className="flex justify-center mt-auto">
                    <button className="py-2.5 px-3 rounded transition duration-200 hover:bg-red-700"
                            onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </ul>
        </nav>
        <div className="flex-1 p-10 text-2xl font-bold">
            <Outlet/>
        </div>
    </div>
    )
};

export default AdminPanel;
