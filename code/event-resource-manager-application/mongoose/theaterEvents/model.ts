import mongoose, { model } from "mongoose"
import { TheaterEventType, TheaterEventSchema  } from "mongoose/theaterEvents/schema"
export default mongoose.models?.theaterEvents || model<TheaterEventType>("theaterEvents", TheaterEventSchema)