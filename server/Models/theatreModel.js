const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const screenSchema = new mongoose.Schema({
    screenname: {
      type: String,
      required: [true, 'Screen name is required'],
    },
    showInfo: [
      {
        moviename: {
          type: String,
          required: [true, 'Movie name is required'],
        },
        showtime: {
          type: String,
          required: [true, 'Show time is required'],
        },
        ticketprice: {
          type: Number,
          required: [true, 'Ticket price is required'],
        },
      },
    ],
  });

const theatreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true
    },
    phone:{
        type:String,
        required:[true,"Phone is Required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
    },
    application:{
    type:Object
    },
    isBlocked:{
      type:Boolean,
    },
    isApproved:{
       type:Boolean
    },
    isRejected:{
        type:Boolean,
        default:false
    },
    Screens:[screenSchema]
},
{
  timestamps: true,
});

theatreSchema.pre("save",async function(next){
 const salt = await bcrypt.genSalt();
 this.password =await bcrypt.hash(this.password,salt)
 next();
})

theatreSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        if(user.isBlocked===false){
            const auth = await bcrypt.compare(password,user.password);
            if(auth){
                return user;
            }
            throw Error("Incorrect password")
        }
        throw Error("You are blocked by admin")
    }
    throw Error("Incorrect Email");
}
module.exports = mongoose.model("Theatres",theatreSchema)