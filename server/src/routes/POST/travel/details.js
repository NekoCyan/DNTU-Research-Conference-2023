/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: [
        { name: 'travelId', required: true }
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
            prompt: string
        }
        */
        const User = await GetUser();
        if (!User) return;
        
        const { travelId } = req.body;
        if (typeof travelId != 'string') return APIResponseHandler(-1, 'Invalid type for travelId.');

        try {
            const Travel = _server.db.Travel();
            const resDetails = await Travel
                .findOne({ userId: User.userId, travelId })
                .select('details response')
                .exec();

            if (!resDetails) return APIResponseHandler(-1, 'Your travelId is not Exists or Deleted.');

            return APIResponseHandler(200, 'success.', {
                promptAsObj: resDetails.details,
                prompt: resDetails.response
            });
        } catch (e) {
            console.log(e);
            return APIResponseHandler(-1, 'An error occurred while getting details for your travel, please try again later.');
        }
    }
}