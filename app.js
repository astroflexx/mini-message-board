const express = require("express");
const path = require("path");
const { indexRoutes } = require("./routes/indexRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use("/", indexRoutes);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
