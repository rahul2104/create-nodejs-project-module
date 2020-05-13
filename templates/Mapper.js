"use strict";
//========================== Load Modules Start =======================

function createMapper(res) {
    var respObj = {
        "message": "Created successfully",
        "result": res
    }
    return respObj;
}

function statusChangeMapper(param){
    var respObj={
        "message":"Status has been changed successfully",
        result:param
    }
    return respObj;
}

//========================== Export Module Start ==============================
module.exports = {
    createMapper,
    statusChangeMapper
}

//========================== Export Module End ===============================