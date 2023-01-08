require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Express app
const app = express();

// Cors
app.use(cors());

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
require("./routes/note.routes")(app);
require("./routes/user.routes")(app);

require("./config/mongoose.config");
app.listen(8000, () => {
  console.log(`Listening at PORT 8000`);
});
