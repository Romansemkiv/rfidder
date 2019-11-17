let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Welcome to REST crafted with love!',
    });
});

let logController = require('../api/controllers/Log');

router.route('/log')
    .get(logController.all)
    .post(logController.new);

    router.route('/log/last')
    .get(logController.getLast)

    router.route('/log/ten')
    .get(logController.getTen)

router.route('/log/:id')
    .get(logController.view)
    .patch(logController.update)
    .delete(logController.delete);

    let deviceController = require('./controllers/Device');

 router.route('/device')
        .get(deviceController.all)
        .post(deviceController.new);

        router.route('/device/ext/:id')
        .get(deviceController.getByExtID)

 router.route('/device/:id')
        .get(deviceController.view)
        .patch(deviceController.update)
        .delete(deviceController.delete);

let moduleController = require('./controllers/Module');

 router.route('/module')
        .get(moduleController.all)
        .post(moduleController.new);

 router.route('/module/:id')
        .get(moduleController.view)
        .patch(moduleController.update)
        .delete(moduleController.delete);



module.exports = router;