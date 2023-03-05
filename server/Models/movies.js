const mongoose = require("mongoose")

const moviesSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description: {
        type: String,
      },
      genre: {
        type: String,
      },
      director: {
          type: String,
      },
      duration: {
          type: String,
      },
      releasedate: {
          type: Date,
      },
      imageUrl: {
        type: String,
    },
      isApproved:{
          type:Boolean,
          default:false
      },
      isBooked:{
          type:Boolean,
          default:false
      }
    },
      {
        timestamps:true
      }
)

const movies = mongoose.model("movies",moviesSchema)
module.exports = movies