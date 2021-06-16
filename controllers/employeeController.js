const express = require('express') 
const router = express.Router();
const mongoose = require('mongoose');
const { employeeModel } = require('../models/employee.model');

router.get('/', (req, res) => {
  res.render("employee/addOrEdit.hbs", {
    viewTitle: "Insert Employee",
  });
});

router.post('/', (req, res) => {
  if(req.body._id == '') insertRecord(req,res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  const employee = new employeeModel({
    fullName: req.body.fullName,
    email: req.body.email,
    mobile: req.body.mobile,
    city: req.body.city,
  });
  employee.save((err, doc) => {
    if(!err) res.redirect('employee/list');
    else {
      if(err.name == 'ValidationError') {
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit.hbs", {
          viewTitle: "Insert Employee",
          employee: req.body
        });
      }
      else console.log("Error during record insertion: " + err);
    }
  })
}

function updateRecord(req, res) {
  employeeModel.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, docs) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
        } else {
          console.log("Error during record update: " + err);
        }
      }
    },
  );
}


function handleValidationError(err, body) {
  for(field in err.errors){
    switch (err.errors[field].path) {
      case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
       case 'email':
         body['emailError'] = err.errors[field].message;
         break;
      default:
        break;
    }
  }
}

router.get("/list", (req, res) => {
  employeeModel.find({}).lean().exec((err, docs) => {
    if(!err) {
      console.log(docs);
      res.render("employee/list.hbs", {
        list: docs
      })
    } else {
      console.log("Error in retrieving employee list: " + err);
    }
    console.log(docs);
  })
});

router.get('/:id', (req, res) => {
  employeeModel.findById(req.params.id, (err, docs) => {
    if(!err) {
      res.render('employee/addOrEdit.hbs', {
        viewTitle: "Update Employee",
        employee: docs
      })
    }
  }).lean()
});

router.get("/delete/:id", (req, res) => {
  employeeModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.redirect("/employee/list");
    } else {
      console.log("Error during record delete: " + err);
    }
  });
});

module.exports = router;