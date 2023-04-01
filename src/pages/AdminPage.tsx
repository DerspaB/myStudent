import React, { useEffect } from "react";
import StudentsList from "../components/StudentsList";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";

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
      <Button onClick={deleteCalendar} variant="contained" color="error">
        Eliminar Calendario
      </Button>
    </div>
  );
};
