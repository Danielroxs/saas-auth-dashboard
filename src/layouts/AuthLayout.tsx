import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="w-full max-w-md p-8 bg-white rounded shadow">
        <Outlet />
      </main>
    </div>
  );
}
