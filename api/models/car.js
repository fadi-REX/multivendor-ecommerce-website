const mongoose = require("mongoose");
const {Schema}  = mongoose;


const carSchema = new Schema ({
   owner : {type: mongoose.Schema.Types.ObjectId, ref:'User'},
   title: String,
   location : String,
   photos: [String],
   description: String,
   contactInfo : String,
   carType : [String],
   price : String,
   
});



const CarModel = mongoose.model('Car',carSchema);


module.exports = CarModel;
