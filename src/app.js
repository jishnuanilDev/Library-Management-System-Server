const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require('./routes/userRoutes');
const bookRouter = require('./routes/bookRoutes');
const borrowRouter = require('./routes/borrowRoutes');
const adminRouter = require('./routes/adminRoutes')
//admin router setup pending.........
const dbConnect = require('./config/db');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});
// Middleware
app.use(express.json());
app.use(cors());
app.use('/', userRouter);
app.use('/admin', bookRouter);
app.use('/', borrowRouter);
app.use('/admin', adminRouter);
dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
