module.exports = {

  checkLogin: async (data, callback) =>{
    try {
      const {username, password} = data.allParams("name");
      user = await User.findOne({ where: 
        { and: [
          { username: username },
          { password: password }
        ]}
      })
      if (user) {
        return callback(null, user);
      }else {
        return callback({details:[{message: "Invalid Username or password"}]},null);
      }
    } catch (error) { 
      return callback(error,null);
    }
  },
  doRegister: async (data, callback) =>{
    try {
      const {username,password} = data.allParams("name");
      user = await User.create({username: username, password: password}).fetch();
      if (user) {
        callback(null,user);
      }else {
        callback({details:[{message: "Error in register" }]},null);
      }
    } catch (error) {
      callback({details:[{message: "Record is already exist" }]},null);
    }
    
  }
}