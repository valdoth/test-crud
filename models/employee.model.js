const mongoose  = require('mongoose')

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  city: {
    type: String
  }
});

//custom validation for email 
employeeSchema.path('email').validate((val) => {
  emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emailRegex.test(val);
}, 'Invalid e-mail.');

const employeeModel = mongoose.model('Employee', employeeSchema, 'employees');
//const employeeModel = mongoose.model("Employee", employeeSchema);
const Employee = mongoose.model("Employee");

module.exports = { employeeModel, Employee };