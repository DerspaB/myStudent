import React, { useEffect } from "react";
import StudentsList from "../components/StudentsList";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { CSVLink } from "react-csv";

export const AdminPage = () => {
  const [students, setStudents] = useState([]);
  const obtenerAlumnos = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/students`
      );
      if (data) {
        setStudents(data.students);
      }
    } catch (error) {}
  };

  const deleteCalendar = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/students`);
      obtenerAlumnos();
    } catch (error) {}
  };

  useEffect(() => {
    obtenerAlumnos();
  }, []);
  return (
    <div className="flex flex-col items-center gap-7 w-full">
      <StudentsList students={students} />
      <div className="flex flex-wrap w-full items-center justify-center gap-5">
        <Button onClick={deleteCalendar} variant="contained" color="error">
          Eliminar Calendario
        </Button>
        <CSVLink
          data={students}
          filename="students"
          className="text-white py-2 px-4 bg-green-700 rounded-md text-[15px] shadow-md"
        >
          EXPORTAR
        </CSVLink>
      </div>
    </div>
  );
};
