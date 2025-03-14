import mongoose, { Schema } from "mongoose";

const customarSchema = new Schema(
  {
    company: { type: String, required: true },   
    region: {
      type: String,
      default: "لايوجد",
    },
    entitySize: {
      type: String,
      default: "A",
      enum:["A","B","C","D"]
    },
    sector: {
      type: String,
      default: "غير محدد",
    },
    person: {
      type: String,
      default: "لا أحد",
    },
    email: {
      type: String,
      default: "لا يوجد",
    },
    phone: {
      type: String,
      default: "غير محدد",
    },
    notes: {
      type: String,
      default: "لا يوجد",
    },        
    isTrashed: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Customar = mongoose.model("Customar", customarSchema);

export default Customar;
