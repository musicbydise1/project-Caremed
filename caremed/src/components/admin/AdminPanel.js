import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => (
    <div className="flex h-screen bg-gray-800 text-white">
        <nav className="w-44 space-y-4 py-5 px-3 bg-gray-900">

            <ul>
                <li>
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
                <li>
                    <Link to="/admin/diagnos"
                          className="block py-2.5 px-3 rounded transition duration-200 hover:bg-gray-700">
                        Diagnosis
                    </Link>
                </li>
            </ul>
        </nav>
        <div className="flex-1 p-10 text-2xl font-bold">
            <Outlet/>
        </div>
    </div>
);

export default AdminPanel;
