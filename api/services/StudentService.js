module.exports = {

    createStudent: async (data, callback) => {
      try{
        const { rollno, name } = data.allParams("name");
        student = await Student.create({name: name, rollno: rollno}).fetch();
        if(student) {
          return callback(null,student)
        }else {
          return callback({ type: "Error in student creation"}, null);
        }
      } catch(error) {
        return callback(error,null);
      }
      
    },
    listStudent: async (callback) => {
      try {
        const StudentList = await Student.find();
        if(StudentList) {
          return callback(null,StudentList);
        }
        else {
          return callback({ type: 'No Students found'},null);
        }
      } catch (error) {
        return callback(error, null);
      }
    },
    getStudent: async (data, callback) => {
      try{
        const id = data;
        const student = await Student.find({id: id});
        if (student) {
          callback(null, student);
        }else {
          callback({ type: "Error in student get"}, null);
        }
      }catch(error){

      }

    },
    updateStudent: async (data, callback) => {
      try{
        const id = data.id;
        const student = await Student.update(
          {id: id},{
            name: data.name,
            rollno: data.rollno
        }).fetch();
        if(student) {
          callback(null,student);
        }else {
          callback({ type: "Error in student update"},null);
        }
      }catch(error){
        callback(error,null)
      }
      
    },
    deleteStudent: async (data, callback) => {
      try {
        const id = data;
        const student = await Student.destroy({id: id}).fetch();
        if(student) {
          callback(null, student);
        }else {
          callback({type: "Error in student delete"}, null)
        }
      } catch (error) {
        callback(error,null)
      }
      
    }
};