import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]); // Состояние для хранения списка пользователей

    useEffect(() => {
        // Загрузка данных о пользователях
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://your-api-url/users'); // Замените URL на ваш API
            setUsers(response.data); // Обновление состояния списка пользователей данными с сервера
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Users List</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {/* Действия, например, кнопки редактирования или удаления */}
                            <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            <button className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
