"use strict";

//========================== Load Modules Start =======================

//========================== Load external modules ====================
var promise = require("bluebird");

//========================== Load internal modules ====================
// Load post service
const appUtils              = require("../../../appUtils");
const config                = require("../../../config");
const customExceptions      = require("../../../customException");

const policeStationService  = require("./policeStationService");
const policeStationMapper   = require("./policeStationMapper");

const adminService          = require("../admin/adminService");

//========================== Load Modules End ==============================================


function create(params) {
        return adminService.isAdmin(params)
        .bind({})
        .then(function (result) {
            if(!result){
                throw customExceptions.unauthorizeAccess();
            }
            if(result.adminType!==1){      
                throw customExceptions.unauthorizeAccess();
            }
           
            return policeStationService.isExist(params)
        })
        .then(function (isExist) {
            if (isExist) {
                throw customExceptions.alreadyExist();
            }
            return policeStationService.create(params) 
        })
        .then(function (result) {
            return policeStationMapper.createMapper(result);
        });

}

function edit(params) {
        return adminService.isAdmin(params)
        .bind({})
        .then(function (result) {
            if(!result){
                throw customExceptions.unauthorizeAccess();
            }
            if(result.adminType!==1){      
                throw customExceptions.unauthorizeAccess();
            }
           
            return policeStationService.isExist(params)
        })
        .then(function (isExist) {
            if (isExist) {
                throw customExceptions.alreadyExist();
            }
            return policeStationService.edit(params) 
        })
        .then(function (result) {
            return policeStationMapper.createMapper(result);
        });

}

function statusChange(params) {
        return adminService.isAdmin(params)
        .bind({})
        .then(function (result) {
            if(!result){
                throw customExceptions.unauthorizeAccess();
            }
            this.adminInfo=result;
            if(this.adminInfo.adminType!==1){ 
                throw customExceptions.unauthorizeAccess();
            }
            return policeStationService.update({_id:params.zoneId},{status:params.status})
        })
        .then(function (result) {
            return policeStationMapper.statusChangeMapper(result);
        })

}

//========================== Export Module Start ==============================

module.exports = {
    create,
    edit,
    statusChange
};

//========================== Export Module End ===============================
