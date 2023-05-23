const {
    HEX_PATTERN,
} = require('../../../utils/Constants');

/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: [
        { name: 'travelId', required: true },
        { name: 'itineraryName', required: false },
        { name: 'color', required: false },
    ],
    authorization: true,
    async run({
        _server, req, res, next, GetUser,
    }, {
        APIResponseHandler,
    }) {
        const User = await GetUser();
        if (!User) return;

        const { travelId, itineraryName, color } = req.body;
        if (typeof travelId != 'string') return APIResponseHandler(-1, 'Invalid type for travelId.');
        if (itineraryName && typeof itineraryName != 'string') return APIResponseHandler(-1, 'Invalid type for itineraryName.');
        if (color) {
            if (typeof color != 'string') return APIResponseHandler(-1, 'Invalid type for color.');
            if (HEX_PATTERN.test(color.toString()) == false) return APIResponseHandler(-1, 'Invalid Hex color.');
        }

        try {
            const Travel = _server.db.Travel();
            let updateQuery = { $set: {} };
            if (itineraryName) updateQuery.$set.itineraryName = itineraryName;
            if (color) updateQuery.$set.color = color;

            const resDetails = await Travel
                .findOneAndUpdate({ userId: User.userId, travelId }, updateQuery, { new: true })
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
            return APIResponseHandler(-1, 'An error occurred while editing for your travel, please try again later.');
        }
    }
}