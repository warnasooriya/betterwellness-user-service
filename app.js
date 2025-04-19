const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const corsOptions = require('./config/corsOptions')
const app = express();
const port = process.env.PORT || 5001;

// Middleware
const requestLogger = require('./middleware/requestLogger');
const errorLogger = require('./middleware/errorLogger');


app.use(cors());
app.options('*', cors()); // Handle preflight requests
app.use(bodyParser.json());


app.use(express.json());
app.use(requestLogger);

// MongoDB connection
const cleanMongoUri = process.env.MONGODB_URI?.replace(/^"(.*)"$/, "$1");
mongoose.connect(cleanMongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB", err));


// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

app.get('/user/health', (req, res) => {
  res.json({ status: 'ok', traceId: req.traceId });
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', traceId: req.traceId });
});

app.use(errorLogger);


// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
` `