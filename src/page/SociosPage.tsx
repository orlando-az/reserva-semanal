import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import SocioList from "../components/SocioList";

const SocioPage = () => {
  const { isAuthenticated, username, rol } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Socios</h1>
        <div className="text-sm text-gray-600">
          Usuario: <strong>{username}</strong> | Rol: <strong>{rol}</strong>
        </div>
      </div>
      <SocioList />
    </div>
  );
};

export default SocioPage;
