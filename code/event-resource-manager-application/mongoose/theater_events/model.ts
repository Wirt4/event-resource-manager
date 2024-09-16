import mongoose, { model } from "mongoose"
import { TheaterEventType, TheaterEventSchema  } from "@/mongoose/theater_events/schema"
export default mongoose.models?.theater_events || model<TheaterEventType>("theater_events", TheaterEventSchema)