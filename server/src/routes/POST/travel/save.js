const {
    checkRequirement,
} = require('../../../utils/Util').prototype;
const {
    TravelDetailsData, HEX_PATTERN,
} = require('../../../utils/Constants');

/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: [
        { name: 'promptAsObj', required: true },
        { name: 'prompt', required: true },
        { name: 'itineraryName', required: true },
        { name: 'color', required: true },
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
                },
            prompt: string,
            itineraryName: string,
            color: string
        }
        */
        const User = await GetUser();
        if (!User) return;

        const { promptAsObj, prompt, itineraryName, color } = req.body;
        const checkData = checkRequirement(
            promptAsObj,
            TravelDetailsData,
            'promptAsObj'
        );

        for (let i = 0; i < TravelDetailsData.length; i++) {
            if (TravelDetailsData[i].type == 'string' && typeof promptAsObj[TravelDetailsData[i].name] != 'string') {
                return APIResponseHandler(-1, `Invalid type for ${TravelDetailsData[i].name} in promptAsObj.`);
            } else if (TravelDetailsData[i].type == 'array' && !Array.isArray(promptAsObj[TravelDetailsData[i].name])) {
                return APIResponseHandler(-1, `Invalid type for ${TravelDetailsData[i].name} in promptAsObj.`);
            } else {
                continue;
            }
        }

        if (checkData.data[0]) return APIResponseHandler(-1, `Missing ${checkData.data.join(', ')} in promptAsObj.`);
        if (HEX_PATTERN.test(color.toString()) == false) return APIResponseHandler(-1, 'Invalid Hex color.');

        try {
            const Travel = await _server.db.Travel();
            const result = await Travel.create({
                userId: User.userId,
                travelId: Date.now(),
                details: {
                    destination: promptAsObj.destination,
                    budget: promptAsObj.budget,
                    duration: promptAsObj.duration,
                    interests: promptAsObj.interests,
                    accommodation: promptAsObj.accommodation,
                    travelWith: promptAsObj.travelWith,
                    moveByVehicle: promptAsObj.moveByVehicle,
                    activities: promptAsObj.activities,
                    cuisines: promptAsObj.cuisines,
                    language: promptAsObj.language,
                },
                itineraryName,
                color,

                response: prompt,
                status: 1
            });

            return APIResponseHandler(
                200,
                'success.',
                {
                    travelId: result.travelId,
                    itineraryName: result.itineraryName,
                    color: result.color,
                }
            );
        } catch (e) {
            console.log(e);
            return APIResponseHandler(-1, 'An error occurred while generating your travel, please try again later.');
        }
    }
}