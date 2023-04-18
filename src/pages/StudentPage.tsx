import {
  Alert,
  AlertColor,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import axios, { AxiosError } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export const StudentPage = () => {
  const getDay = (dia: number) => {
    const diaRequerido = dia;
    const hoy = moment().isoWeekday();

    if (hoy <= diaRequerido) {
      return moment().isoWeekday(diaRequerido);
    } else {
      /*Si no pertenece a la semana actual ir a proxima semana */
      return moment().add(1, "weeks").isoWeekday(diaRequerido);
    }
  };

  const initialForm = {
    nombre: "",
    grado: "",
    numeroAcudiente: "",
    clase: "",
    fechaClase: getDay(4).format("YYYY-MM-DD"),
  };

  interface Alert {
    severity: AlertColor;
    color: any;
    text: string;
  }

  const [form, setForm] = useState({ ...initialForm });
  const [isLimit, setIsLimit] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState<Alert>({
    severity: "success",
    color: "error",
    text: "",
  });

  const listOfCourses = ["6", "7", "8", "9", "10", "11"];

  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const obtenerAlumnos = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/students`
      );
      if (data) {
        data.students.length >= 30 ? setIsLimit(true) : setIsLimit(false);
      }
    } catch (error) {}
  };

  const agendarAlumno = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/students`,
        form
      );
      setForm({ ...initialForm });
      if (data.msg) {
        setMessage({
          color: "success",
          severity: "success",
          text: data.msg,
        });
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        obtenerAlumnos();
      }
    } catch (error) {
      const err = error as AxiosError;
      const msg: any = err.response?.data;
      setMessage({
        color: "error",
        severity: "error",
        text: `${msg.errors[0].msg}`,
      });
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      setForm({ ...initialForm });
      obtenerAlumnos();
    }
  };

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  return (
    <div className="w-[90%] md:w-[60%]">
      {isLimit && (
        <Paper
          sx={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "20px",
          }}
          elevation={3}
        >
          <Typography variant="h4" color={"red"}>
            Agenda llena
          </Typography>
          <SentimentVeryDissatisfiedIcon />
        </Paper>
      )}
      {!isLimit && (
        <Paper
          sx={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "20px",
          }}
          elevation={3}
        >
          <Typography variant="h4">Agendar Asesoria</Typography>
          <TextField
            value={form.nombre}
            name="nombre"
            sx={{ marginTop: 6 }}
            fullWidth
            error={form.nombre.length < 3}
            id="outlined-error"
            label="Nombre Completo"
            onChange={handleChangeForm}
            placeholder="Escriba su nombre"
          />
          <FormControl
            variant="outlined"
            sx={{ width: "100%" }}
            error={form.grado.length === 0}
          >
            <InputLabel>Grado</InputLabel>
            <Select
              name="grado"
              value={form.grado}
              onChange={handleChangeForm}
              label="Clase Refuerzo"
            >
              {listOfCourses.map((course, index) => (
                <MenuItem key={`${course} ${index}`} value={course}>
                  {course}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            value={form.numeroAcudiente}
            name="numeroAcudiente"
            fullWidth
            error={form.numeroAcudiente.length < 10}
            id="outlined-error"
            label="Número Acudiente"
            onChange={handleChangeForm}
            placeholder="Escriba el número de acudiente"
          />
          <FormControl
            variant="outlined"
            sx={{ width: "100%", marginBottom: "15px" }}
            error={form.clase.length < 1}
          >
            <InputLabel>Clase Refuerzo</InputLabel>
            <Select
              name="clase"
              value={form.clase}
              onChange={handleChangeForm}
              label="Clase Refuerzo"
            >
              <MenuItem value={"Mecatrónica"}>Mecatrónica</MenuItem>
              <MenuItem value={"Matemáticas"}>Matemáticas</MenuItem>
              <MenuItem value={"Programación"}>Programación</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="fechaClase"
            fullWidth
            error={false}
            id="outlined-error"
            label="Fecha Clase"
            onChange={handleChangeForm}
            type="date"
            value={form.fechaClase}
            disabled
          />
          <Button onClick={agendarAlumno} variant="contained">
            Agendar
          </Button>
          {showMessage && (
            <div className="absolute bottom-5 ml-auto">
              <Alert severity={message.severity} color={message.color}>
                {message.text}
              </Alert>
            </div>
          )}
        </Paper>
      )}
    </div>
  );
};
