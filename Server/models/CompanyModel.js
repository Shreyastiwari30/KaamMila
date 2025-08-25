import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    website: { type: String, default: "" },
    location: { type: String, default: "" },
    logo: { type: String, default: "" },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
