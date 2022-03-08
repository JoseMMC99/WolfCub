import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

app.listen(8080, () => {
  console.log("Server Listening on 8080");
});
