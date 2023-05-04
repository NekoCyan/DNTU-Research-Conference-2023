import { Document, Model } from 'mongoose';

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

export interface TravelSchema {
	userId: { type: String; required: true };
	destination: { type: String; required: true };
	budget: { type: String; required: true };
	duration: { type: String; required: true };
	interest: { type: Array };

	plannedTimestamp: { type: String; required: true };
	response: { type: String };
	status: { type: Number };
}
export interface TravelDocument extends Document, TravelSchema {}
export type TravelModel = Model<TravelDocument>;