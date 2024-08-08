import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  sender: mongoose.Schema.Types.ObjectId;
  recipient?: mongoose.Schema.Types.ObjectId;
  messageType: "text" | "file";
  content?: string;
  fileUrl?: string;
  timeStamp: Date;
}


const messageSchema = new Schema<IMessage>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },
  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    validate: {
      validator: function (this: IMessage, value: string) {
        return this.messageType !== "text" || (value && value.trim().length > 0);
      },
      message: "Content is required when messageType is 'text'.",
    },
  },
  fileUrl: {
    type: String,
    validate: {
      validator: function (this: IMessage, value: string) {
        return this.messageType !== "file" || (value && value.trim().length > 0);
      },
      message: "File URL is required when messageType is 'file'.",
    },
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model<IMessage>("Messages", messageSchema);

export default Message;
