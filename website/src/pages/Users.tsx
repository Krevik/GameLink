import React, { ReactElement, useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";
import Layout from "../components/Layout/Layout.tsx";
import { DataTable } from "primereact/datatable";
import { GenericColumn } from "../components/DataTable/GenericColumn.tsx";

interface User {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    steamId: string | null;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await getAllUsers();
            setUsers(response.data);
        };

        loadUsers();
    }, []);

    const getCreatedAtCellBody = (rowData: User): ReactElement => (
        <span>{`${new Date(rowData.createdAt).toLocaleDateString()} ${new Date(rowData.createdAt).toLocaleTimeString()}`}</span>
    );

    const getSteamIdCellBody = (rowData: User): ReactElement => <span>{`${rowData.steamId ? rowData.steamId : "Not connected"}`}</span>;

    return (
        <Layout>
            <DataTable value={users}>
                <GenericColumn<User> field="id" header="ID" />
                <GenericColumn<User> field="username" header="Username" />
                <GenericColumn<User> field="email" header="Email" />
                <GenericColumn<User> header="Created At" body={getCreatedAtCellBody} />
                <GenericColumn<User> header="Steam ID" body={getSteamIdCellBody} />
                {/*<GenericColumn<User> header="Actions" body={() => <button>Edit</button>} />*/}
            </DataTable>
        </Layout>
    );
};

export default Users;
