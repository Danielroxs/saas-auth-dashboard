import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <main className="w-full max-w-md p-8 bg-gray-200 rounded shadow">
        <Outlet />
      </main>
    </div>
  );
}
