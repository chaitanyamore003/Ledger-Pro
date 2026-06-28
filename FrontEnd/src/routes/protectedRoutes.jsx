import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  // Wait until authentication is initialized
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-lg font-semibold text-slate-600">Loading...</h2>
      </div>
    );
  }

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected page
  return children;
}

export default ProtectedRoute;
