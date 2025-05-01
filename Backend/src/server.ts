import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pgClient } from "./db"; // adjust if your pgClient is from another module
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.post("/register", (req: Request, res: Response): void => {
  (async () => {
    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const userCheck = await pgClient.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if ((userCheck.rowCount ?? 0) > 0) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await pgClient.query(
        "INSERT INTO users (email, name, password) VALUES ($1, $2, $3)",
        [email, name, hashedPassword]
      );

      return res.status(200).json({ message: "Registered successfully" });
    } catch (err: any) {
      console.error("❌ [Register Error]:", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  })();
});