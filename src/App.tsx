import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="bg-gray-400">
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
