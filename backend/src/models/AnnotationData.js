const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnnotationDataSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Annotations", AnnotationDataSchema);
