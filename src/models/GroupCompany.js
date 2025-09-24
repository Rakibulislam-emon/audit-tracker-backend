import mongoose from "mongoose";

const GroupCompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.GroupCompany || mongoose.model("GroupCompany", GroupCompanySchema);
