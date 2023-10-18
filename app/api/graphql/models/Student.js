import mongoose from "mongoose";

export const Student = mongoose.model("Student", {
  firstName: String,
  lastName: String,
  age: Number,
});
