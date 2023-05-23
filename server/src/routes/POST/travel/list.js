/**
 * @type {import('../../../../typings').RouteData}
 */
module.exports = {
    status: true,
    query: null,
    headers: null,
    body: [
        { name: 'skip', required: true },
        { name: 'limit', required: true }
    ],
    authorization: true,
    async run({
        _server, req, res, next, GetUser,
    }, {
        APIResponseHandler,
    }) {
        const User = await GetUser();
        if (!User) return;

        const { skip, limit } = req.body;
        if (isNaN(skip) || isNaN(limit)) return APIResponseHandler(-1, 'Invalid type for skip or limit.');
        const sk = parseInt(skip);
        const li = parseInt(limit);
        if (sk < 0 || li < 0) return APIResponseHandler(-1, 'Invalid value for skip or limit.');

        try {
            const Travel = _server.db.Travel();
            const resList = await Travel
                .find({ userId: User.userId })
                .sort({ _id: 1 }) // 1 = ASC, -1 = DESC
                .skip(sk)
                .limit(li)
                .select('travelId itineraryName color')
                .exec();

            return APIResponseHandler(200, 'success.',
                [
                    ...resList.map(x => {
                        return {
                            travelId: x.travelId,
                            itineraryName: x.itineraryName,
                            color: x.color
                        };
                    })
                ]
            );
        } catch (e) {
            console.log(e);
            return APIResponseHandler(-1, 'An error occurred while listing your travel, please try again later.');
        }
    }
}