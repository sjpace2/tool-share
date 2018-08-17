module.exports = {

    read: ( req, res ) => {
        let { authID } = req.session.user
        req.app.get('db').get_user_info([ authID ])
        .then( response => {
            req.session.user = response[0]
            res.sendStatus(200)
        })
        .catch(console.log)
    },
    
    update: (req, res) => {
        const {id} = req.params;
        const {lat, long} = req.body;
        req.app.get('db').update_user_latlong([id, lat, long])
        .then( response => {
            res.status(200)
        })
    },

    getUserSession: (req, res) => {
        res.status(200).send(req.session);
        console.log(req.session)
    },

}