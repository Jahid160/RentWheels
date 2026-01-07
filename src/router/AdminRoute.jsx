import React from 'react';







import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import UseTime from '../Components/Loading/Loading';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';


const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <UseTime></UseTime>
    }

    if (role !== 'admin') {
        return <ErrorPage></ErrorPage>
    }

    return children;
};

export default AdminRoute;