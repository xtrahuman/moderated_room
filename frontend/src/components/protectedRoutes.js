import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLoading, user , redirectPath = "/login", children }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute
