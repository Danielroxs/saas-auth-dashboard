import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center-safe h-screen bg-gray-300">
      <h1 className="text-4xl font-bold mb-4">Bienbenido al Dashboard SaaS</h1>
      <Link
        to="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Iniciar sesión
      </Link>
    </div>
  );
};

export default HomePage;
