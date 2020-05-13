"use strict";

//========================== Load Modules Start =======================

var mongoose                = require("mongoose");
let BaseDao                 = require('../../../dao/baseDao');

const policeStationModel    = require('./policeStationModel');

const policeStationDao      = new BaseDao(policeStationModel);
//========================== Load Modules End ==============================================

function create(params) {
    let data = new policeStationModel(params);
    return policeStationDao.save(data)
}

function update(query,update,option={}) {
        update.updated = new Date();   
        option.new = true;
        option.upsert=true;
    return policeStationDao.update(query, update, option);
}


function getByKey(query) {
    return policeStationDao.findOne(query)
}

function getByKeyAll(query) {
    return policeStationDao.find(query)
}
//========================== Export Module Start ==============================

module.exports = {
    create,
    update,
    getByKey,
    getByKeyAll
};

//========================== Export Module End ===============================
