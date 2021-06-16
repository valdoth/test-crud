const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/EmployeeDB', 
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if(!err) console.log("MongoDB connection succeeded");
    else console.log("MongoDB connection error: " + err)
  }
);
