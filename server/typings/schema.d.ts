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
	travelId: { type: String; required: true; unique: true };

	details: {
		destination: { type: String };
		budget: { type: String };
		duration: { type: Number };
		interests: { type: Array };
		accommodation: { type: String };
		travelWith: { type: String };
		moveByVehicle: { type: String };
		activities: { type: Array };
		cuisines: { type: Array };
		language: { type: String };
	};
	itineraryName: { type: String };
	color: { type: String };

	response: { type: String };
	status: { type: Number };
}
export interface TravelDocument extends Document, TravelSchema {}
export type TravelModel = Model<TravelDocument>;
