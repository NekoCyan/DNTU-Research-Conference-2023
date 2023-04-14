import { Collection } from '@discordjs/collection';
import { ServerManager } from '../src/class/ServerManager';
import RouteManager from '../src/class/RouteManager';
import Util from '../src/utils/Util';

export class ServerManager {
	public constructor();

	public routes: Collection<string, RouteData>;
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
