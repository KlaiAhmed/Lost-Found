import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext";

type RequireRoleProps = {
  allowedRoles: string[];
};

const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

  return <Outlet />;
}

const GuestOnly = () => {
    const { user } = useContext(AuthContext);
    if (user) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

export { RequireRole, GuestOnly };
