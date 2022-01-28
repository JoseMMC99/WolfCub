import express, { json } from "express";
import cors from "cors";
import petRoutes from "./routes/pets_routes";

const app = express();
app.use(cors());
app.use(json());

app.use("/api", petRoutes);

app.listen(8008, () => {
  console.log("Server Listening on 8008");
});
