const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const documentRoutes = require("./routes/documentRoutes");
const versionRoutes = require("./routes/versionRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://dinithrusiru2:OVyT16rMCnyPQnKB@cluster0.bn1wf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/document-management-system",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/documents", documentRoutes);
app.use("/app", versionRoutes);

const PORT = 4002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
