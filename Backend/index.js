import "./config/env.js";
import express from 'express';
import cors from "cors";
import connectDB from './config/db.js';
import userRoutes from './Routes/user.routes.js';
import problemRoutes from './Routes/problem.routes.js';

const app = express();
connectDB();

app.listen(5000, () => {
  console.log("Server Running");

});
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user', userRoutes);
app.use('/api/problem', problemRoutes);

app.get('/', (_, res) => {
  console.log("Server is Alive");
  return res.status(200).json({ message: "Server is Alive" })
});

app.use((err, req, res, next) => {
  console.log("error")
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message
  });
});


