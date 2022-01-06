const express = require("express");
// const path = require("path");

const testRoutes=require('./routes/test');
const mestoRoutes=require('./routes/mesto');
const ponudaRoutes=require('./routes/ponuda');
const proizvodRoutes=require('./routes/proizvod');
const jedinicaMereRoutes=require('./routes/jedinica_mere');
const zaposleniRoutes=require('./routes/zaposleni');


const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// app.use("/images", express.static(path.join("./", "/resources/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

app.use("/test", testRoutes);
app.use("/mesto", mestoRoutes);
app.use("/ponuda", ponudaRoutes);
app.use("/proizvod", proizvodRoutes);
app.use("/jedinica-mere", jedinicaMereRoutes);
app.use("/zaposleni", zaposleniRoutes);


module.exports = app;
