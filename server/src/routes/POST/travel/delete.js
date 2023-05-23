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
        const User = await GetUser();
        if (!User) return;

        const { travelId } = req.body;
        if (typeof travelId != 'string') return APIResponseHandler(-1, 'Invalid type for travelId.');

        try {
            const Travel = _server.db.Travel();
            const resDetails = await Travel
                .findOneAndDelete({ userId: User.userId, travelId }, { returnOriginal: true })
                .select('travelId itineraryName color')
                .exec();

            if (!resDetails) return APIResponseHandler(-1, 'Your travelId is not Exists or Deleted.');

            return APIResponseHandler(
                200,
                'success.',
                {
                    travelId: resDetails.travelId,
                    itineraryName: resDetails.itineraryName,
                    color: resDetails.color,
                }
            );
        } catch (e) {
            console.log(e);
            return APIResponseHandler(-1, 'An error occurred while deleting for your travel, please try again later.');
        }
    }
}