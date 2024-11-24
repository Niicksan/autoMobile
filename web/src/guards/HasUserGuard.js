import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

export const HasUserGuard = ({
    children,
}) => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to="/catalog/vehicles" />;
    }

    return children ? children : <Outlet />
};