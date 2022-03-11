import express, { json } from "express";
import cors from "cors";
import medicalRoutes from "./routes/medicaltest_routes";
import appointmentRoutes from "./routes/appointment_routes";

const app = express();
app.use(cors());
app.use(json());

app.use("/api", medicalRoutes);
app.use("/api", appointmentRoutes);

app.listen(8080, () => {
  console.log("Appointments Server Listening on 8080");
});
