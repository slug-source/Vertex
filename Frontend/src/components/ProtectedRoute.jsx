import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';

const ProtectedRoute = () => {

    if (getToken()){
        return <Outlet />
    } 
    else {
        return <Navigate to="/login" replace />
    }

}

export default ProtectedRoute;