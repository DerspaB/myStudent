import { Navigate, Route, Routes } from "react-router-dom";
import { StudentPage } from "../pages/StudentPage";
import { AdminPage } from "../pages/AdminPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<StudentPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};
