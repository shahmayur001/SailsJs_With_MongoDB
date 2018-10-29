/**
 * StudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
module.exports = {
  
 list: async (req, res) => {
    StudentService.listStudent((error, result)=>{
        if (error) {
            console.error("This is an error", error);
            return res.view('500',{message: "An error occured"});
        }else {
            return res.view('pages/list',{
                studentList: result,
                status: 'OK'
             });
        }
    });       
 },
 new: (req, res) => {
     return res.view('pages/new',{student: {},errors: false });
 },
 create: (req, res) => {
    
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        rollno: Joi.number().integer().min(1).required()
    });
    Joi.validate(req.allParams("name"), schema, function (err, value) { 
        if(err){
            return res.view('pages/new',{status: 'ERROR', student: req.allParams("name"), errors: err.details});
        }else {
            StudentService.createStudent(req, (error, result) => {
                if(error) {
                    return res.view('pages/new',{status: 'ERROR', student: req.allParams("name"),errors: false });
                }else {
                    return res.redirect('student');
                }
             });
        }
    });  
 },
 show: (req, res) => {
     StudentService.getStudent(req.params.id, (error, result) => {
        if(error){
            console.error("This is an error", error);
            return res.view('500',{message: "An error occured"});
        }else {
            return res.view('pages/show',{student: result});
        }
     });
 },
 edit: (req, res) => {
    StudentService.getStudent(req.params.id, (error, result) => {
        if(error) {
            console.error("This is an error", error);
            return res.view('500',{message: "An error occured"});
        }else {
            return res.view('pages/edit',{student: result});
        }
     });
 },
 update: (req, res) => {
     StudentService.updateStudent(req.allParams("name"), (error, result) => {
        if(error) {
            console.error("This is an error", error);
            return res.view('500',{message: "An error occured"});
        }else {
            return res.redirect('/student');
        }
     });
 },
 delete: (req, res) => {
     StudentService.deleteStudent(req.params.id,(error, result)=> {
        if(error) {
            console.error("This is an error", error);
            return res.view('500',{message: "An error occured"});
        }else {
            return res.redirect('/student');
        } 
     });
 }
};

