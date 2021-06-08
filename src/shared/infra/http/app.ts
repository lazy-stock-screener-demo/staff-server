import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import passport from "passport";
import { v1Router } from "./restAPI/v1";
const origin = {
  origin: "*",
};
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors(origin));
app.use(passport.initialize());
app.use(passport.session());

app.use(v1Router);

export default app;
