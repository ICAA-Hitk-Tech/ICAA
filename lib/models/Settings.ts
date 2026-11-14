import { Schema, model, models, type Model } from "mongoose";
import type { SettingsDoc } from "@/lib/types";

const SettingsSchema = new Schema<SettingsDoc>(
  {
    _id: {
      type: String,
      required: true
    },
    certificatesReleased: {
      type: Boolean,
      default: false
    },
  },
  {
    _id: false,
    versionKey: false,
    timestamps: true,
  },
);

export const SettingsModel: Model<SettingsDoc> =
  (models["Settings"] as Model<SettingsDoc>) ??
  model<SettingsDoc>("Settings", SettingsSchema, "settings");
