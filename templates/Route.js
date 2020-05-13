const Router            = require("express").Router();
const resHndlr          = require('../../../responseHandler');
const middleware        = require("../../../middleware");
const constants         = require("../../../constant");
const policeStationValidator= require('./policeStationValidator');
const policeStationFacade = require("./policeStationFacade");
//========================== Load Modules Start =======================
    
Router.route("/create")
    .post([middleware.authenticate.autntctTkn,policeStationValidator.validateCreate], function (req, res) {
        let {user} = req;
        let {stateId,state,zone,thana,district,addType} = req.body;
        policeStationFacade.create({user,stateId,state,zone,thana,district,addType})
            .then(function (result) {
                resHndlr.sendSuccess(res, result,req);
            })
            .catch(function (err) {
                resHndlr.sendError(res, err,req);
            })
    });
    
Router.route("/edit")
    .post([middleware.authenticate.autntctTkn,policeStationValidator.validateCreate], function (req, res) {
        let {user} = req;
        let {stateId,state,zone,thana,district,addType,editId} = req.body;
        policeStationFacade.edit({user,stateId,state,zone,thana,district,addType,editId})
            .then(function (result) {
                resHndlr.sendSuccess(res, result,req);
            })
            .catch(function (err) {
                resHndlr.sendError(res, err,req);
            })
    });
    
Router.route("/statusChange")
    .post( [middleware.authenticate.autntctTkn,policeStationValidator.validateStatusChange],function (req, res) {
        let { zoneId,status } = req.body;
        let {user} = req;
        policeStationFacade.statusChange({user,zoneId,status })
            .then(function (result) {
                resHndlr.sendSuccess(res, result,req);
            }).catch(function (err) {
                resHndlr.sendError(res, err,req);
            })
    });

module.exports = Router