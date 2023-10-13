/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';



export class userDocument extends Document {
  id: string;
  name: string;
  password: string
  email: string;
  role:string
  branchId:string
}


export const userSchema = new Schema<userDocument>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  branchId: { type: String, required: true },
});


export const userModelName = 'user';

