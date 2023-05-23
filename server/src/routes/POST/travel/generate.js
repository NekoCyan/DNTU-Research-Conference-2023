const Planner = require('../../../utils/Planner');
const {
    checkRequirement,
} = require('../../../utils/Util').prototype;
const {
    TravelDetailsData,
} = require('../../../utils/Constants');

/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: [
        { name: 'promptAsObj', required: true }
    ],
    authorization: true,
    async run({
        _server, req, res, next, GetUser,
    }, {
        APIResponseHandler,
    }) {
        /**
        {
            promptAsObj: {
                destination: string,
                budget: string,
                duration: number,
                interests: Array<string>,
                accommodation: string,
                travelWith: string,
                moveByVehicle: string,
                activities: Array<string>,
                cuisines: Array<string>,
                language: string
            }
        }
        */
        const User = await GetUser();
        if (!User) return;

        const { promptAsObj } = req.body;
        const checkData = checkRequirement(
            promptAsObj,
            TravelDetailsData,
            'promptAsObj'
        );

        for(let i = 0; i < TravelDetailsData.length; i++) {
            if (TravelDetailsData[i].type == 'string' && typeof promptAsObj[TravelDetailsData[i].name] != 'string') {
                return APIResponseHandler(-1, `Invalid type for ${TravelDetailsData[i].name} in promptAsObj.`);
            } else if (TravelDetailsData[i].type == 'array' && !Array.isArray(promptAsObj[TravelDetailsData[i].name])) {
                return APIResponseHandler(-1, `Invalid type for ${TravelDetailsData[i].name} in promptAsObj.`);
            } else {
                continue;
            }
        }

        if (checkData.data[0]) return APIResponseHandler(-1, `Missing ${checkData.data.join(', ')} in promptAsObj.`);

        const result = await Planner(promptAsObj);
        if (result instanceof Error) return APIResponseHandler(-1, 'Something went wrong while generating the itinerary. Please try again later.');

        return APIResponseHandler(200, 'success.', result.toString());
    }
}