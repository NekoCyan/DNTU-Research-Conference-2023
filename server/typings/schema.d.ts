import { Document, Model, Query } from 'mongoose';

export interface UserSchema {
	userId: { type: String; required: true; unique: true };
	fullname: { type: String; required: true };
	username: { type: String; required: true };
	password: { type: String; required: true };
	email: { type: String };
	token: { type: String };
}

export interface UserDocument extends Document, UserSchema {}
export type UserModel = Model<UserDocument>;