// AdminPanel.js
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import Dashboard from "../../pages/admin/Dashboard";
import Users from "../../pages/admin/Users";
import dataProvider from '../../data/dataProvider'; // Подключаем ваш dataProvider

const AdminPanel = () => (
    <Admin dataProvider={dataProvider}>
        {/* Добавляем ресурсы, которые вы хотите управлять */}
        {/* Добавьте другие ресурсы по мере необходимости */}
        {/* Например: <Resource name="users" list={UsersList} /> */}
        {/* Используйте ваши админские компоненты */}
        <Resource name="dashboard" list={Dashboard} />
        <Resource name="users" list={Users} />
    </Admin>
);

export default AdminPanel;
