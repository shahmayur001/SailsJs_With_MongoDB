/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
module.exports = {
  
  login: async (req, res) =>{
    if (req.session.me) {
      return res.redirect('student');
    }else {
      return res.view('pages/login',{user: {}, errors: false});
    }
  },
  checkLogin: async (req, res) =>{
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().required(),
      password: Joi.string().alphanum().required()
    });
    Joi.validate(req.allParams("name"), schema, function (error, value) { 
      if(error){
          return res.view('pages/login',{status: 'ERROR', user: req.allParams("name"), errors: error.details});
      }else {
          UserService.checkLogin(req, (error, result) => {
              if(error) {
                return res.view('pages/login',{status: 'ERROR', user: req.allParams("name"), errors: error.details});
              }else {
                  req.session.me = result.id;
                  return res.redirect('student');
              }
           });
      }
    }); 
  },
  register: async (req, res) => {
    if (req.session.me) {
      return res.redirect('student');
    }else {
      return res.view('pages/register',{user: {}, errors: false});
    }
  },
  doRegister: async (req, res) =>{
    const schema = Joi.object().keys({
      username: Joi.string().alphanum().required(),
      password: Joi.string().alphanum().required()
    });
    Joi.validate(req.allParams("name"), schema, function (error, value) { 
      if(error){
          return res.view('pages/register',{status: 'ERROR', user: req.allParams("name"), errors: error.details});
      }else {
          UserService.doRegister(req, (error, result) => {
              if(error) {
                return res.view('pages/register',{status: 'ERROR', user: req.allParams("name"), errors: error.details});
              }else {
                  req.session.me = result.id;
                  return res.redirect('student');
              }
           });
      }
    });
  },
  logout: async (req, res) =>{
    req.session.me = null;
    return res.redirect('login');
  }
};

