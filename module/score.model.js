import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    scoreArr: {
      type: Array,
      default: [],
    },
    dayId: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", ScoreSchema);

export default Score;
