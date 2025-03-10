import mongoose, { Schema } from "mongoose";

const buldingSchema = new Schema(
  {
    documnetNum: { type: Number, required: true, unique: true },
    client: [
      {
        nationalId: {
          type: Number,
          required: true,
        },
        name: String,
        owingPercentage: { type: Number, max: 100, min: 0 },
        phone: String,
      },
    ],
    identityId: {
      type: String,
      default: "لايوجد",
    },
    type: {
      type: String,
      default: "غير محدد",
    },
    size: {
      type: Number,
    },
    usageType: {
      type: String,
      default: "غير محدد",
    },
    site: {
      type: String,
      default: "غير محدد",
    },
    pieceNumber: {
      type: Number,
      default: 0,
    },
    district: {
      type: String,
      default: "غير محدد",
    },
    city: {
      type: String,
      default: "غير محدد",
    },
    reasone: {
      type: String,
      default: "لا يوجد سبب",
    },
    activities: [
      {
        type: {
          type: String,
          default: "البدأ",
          enum: ["البدأ", "معاينه", "مشكله", "عرض اسعار", "تعليق", "تم الانتهاء"],
        },
        activity: String,
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    subTasks: [
      {
        title: { type: String, required: true },
        tag: String,
      },
    ],
    assets: [String],
    priceOffer: [String],
    isTrashed: { type: Boolean, default: false },
  },

  { timestamps: true }
);

const Bulding = mongoose.model("Bulding", buldingSchema);

export default Bulding;
