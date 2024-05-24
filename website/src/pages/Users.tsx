import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";
import Layout from "../components/Layout/Layout.tsx";

const Users: React.FC = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await getAllUsers();
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    return (
        <Layout>
            <h1>Users</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </Layout>
    );
};

export default Users;
