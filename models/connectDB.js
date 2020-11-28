var mongoose = require('mongoose');
require('dotenv').config()

var dbKey= process.env.lacapsuleDB
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
}
mongoose.connect(`mongodb+srv://lacapsule:${dbKey}@cluster0-9xbpy.mongodb.net/blackboard?retryWrites=true&w=majority`, 

    options,         
    function(error){
      if (error) {
        console.log(error);
      } else {
        console.log("connection ok");
        
        
      }
    }
);
