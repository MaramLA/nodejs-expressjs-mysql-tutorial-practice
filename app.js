import dotenv from "dotenv";
import express from "express";
import { createNote, getNote, getNotes } from "./database.js";
import cors from "cors";
// loading environment variables
dotenv.config();

// creating express app
const app = express();

const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get("/notes", async (req, res, next) => {
  try {
    const notes = await getNotes();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

app.get("/notes/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await getNote(id);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
});

app.post("/notes", async (req, res, next) => {
  try {
    console.log(req.body);
    const { title, contents } = req.body;
    const newNote = await createNote(title, contents);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
});

// error handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json("something went wrong");
});

// runnining server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
