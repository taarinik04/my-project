const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  time: { type: Date, default: Date.now },
});

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    attachment: {
      type: String,
    },
    status: {
      type: String,
      default: "Open",
    },
    comments: [commentSchema],
    Admincomments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
