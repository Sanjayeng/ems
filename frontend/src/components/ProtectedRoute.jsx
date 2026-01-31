import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
