const mongoose = require('mongoose');

const { Schema } = mongoose;
const reservationSchema = new Schema({
  showDate: {
    type: String,
    required: true,
  },
  bookedDate: {
    type: Date,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: 'movies',
    required: true,
  },
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: 'Theatres',
    required: true,
  },
  userId: {
    type: String,
    // required: true,
  },
  checkin: {
    type: Boolean,
    default: false,
  },
  qrcode: {
    type: String,
   
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;