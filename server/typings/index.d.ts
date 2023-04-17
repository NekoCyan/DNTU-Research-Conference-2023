import { Collection } from '@discordjs/collection';
import { ServerManager } from '../src/class/ServerManager';
import RouteManager from '../src/class/RouteManager';
import Util from '../src/utils/Util';
import mongoose from 'mongoose';

export class ServerManager {
	public constructor(options?: ServerManagerOptions);

	public options: ServerManagerOptions;
	private _validateOptions(): void;

	public routes: Collection<string, RouteData>;
	public db: null | Database;
}

export interface ServerManagerOptions {
	/**
	 * Debug on Routers: GET | POST.
	 * @default false
	 */
	dedug: boolean;
}

export interface RouteData {
	status: boolean;
	query?: Array<RouteDataArrayRequired>;
	body?: Array<RouteDataArrayRequired>;
	public run(
		Manager: RouteManager,
		Utilities: Util,
	): Promise<APIResponseHandler>;
}

export interface RouteDataArrayRequired {
	name: string;
	required: boolean;
}

export interface APIResponseHandler {
	code: number;
	isError: boolean;
	message: string;
	data: Array<data> | string | object | null;
}

export class Database {
	constructor(options?: DatabaseOptions);

	public options: DatabaseOptions;
	private _validateOptions(): void;

	private connectedTimestamp: null | number;

	public async connect(): Promise<void>;
	public async disconnect(): Promise<void>;
	get ready(): boolean;
	get timestamp(): null | number;

	// Database Schema / Collections.
	public async User(): Promise<mongoose.Model<any, {}, {}, {}, any, any>>;
}

export interface DatabaseOptions {
	/**
	 * URL / URI of the database.
	 */
	url: string;
	/**
	 * Database Name.
	 */
	name: string;
	/**
	 * Automatically break the Process when an error occurs (fails to Connect/Disconnect to Database).
	 * @default true
	 */
	breakOnError: boolean;
}
