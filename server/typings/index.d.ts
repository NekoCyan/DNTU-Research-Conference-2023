import { Collection } from '@discordjs/collection';
import { ServerManager } from '../src/class/ServerManager';
import RouteManager from '../src/class/RouteManager';
import Util from '../src/utils/Util';
import mongoose from 'mongoose';
import * as Schema from './schema';

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
	/**
	 * Show variables / data that Missing in the Request (query|header|body).
	 * @default true
	 */
	ShowRequiredRequest: boolean;
}

export interface RouteData {
	/**
	 * Enable this Route?
	 */
	status: boolean;
	/**
	 * Query Request.
	 */
	query?: Array<RouteDataArrayRequired> | null;
	/**
	 * Headers Request.
	 */
	headers?: Array<RouteDataArrayRequired> | null;
	/**
	 * Body Request.
	 */
	body?: Array<RouteDataArrayRequired> | null;
	/**
	 * Check if authorization is available/non-null/non-undefined in Header Request.
	 */
	authorization: boolean;
	public async run(
		RouteManager: RouteManager,
		Utilities: Util,
	): Promise<string | APIResponseHandler>;
}

export interface RouteDataArrayRequired {
	name: string;
	required: boolean;
}

export interface APIResponseHandler {
	code: number;
	/**
	 * If code number is negative number, this will be true.
	 */
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

	public async User(): Promise<Schema.UserModel>;
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
