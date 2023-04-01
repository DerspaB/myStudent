import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

interface Students {
  _id: string;
  estado: boolean;
  nombre: string;
  grado: number;
  numeroAcudiente: string;
  fechaClase: string;
}

interface Props {
  students: Students[];
}

export default function StudentsList({ students }: Props) {
  return (
    <List
      sx={{
        width: "80%",
        maxHeight: "700px",
        overflow: "auto",
        bgcolor: "background.paper",
      }}
    >
      {students.map((student, index) => (
        <div key={`${student.nombre}-${index}`}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={student.nombre} src="/" />
            </ListItemAvatar>
            <ListItemText
              primary={student.nombre}
              secondary={
                <div className="w-full" key={index}>
                  <ul>
                    <li>
                      <strong>Grado:</strong> {student.grado}
                    </li>
                    <li>
                      <strong>Celular:</strong> {student.numeroAcudiente}
                    </li>
                    <li>
                      <strong>Fecha:</strong> {student.fechaClase.split("T")[0]}
                    </li>
                  </ul>
                </div>
              }
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}
