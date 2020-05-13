var _ = require("lodash");

var constant = require("../../../constant");

var exceptions = require("../../../customException");

//========================== Load Modules End =============================


var validateCreate = function (req, res, next) {
    for (const [key, value] of Object.entries(req.body)) {
        req.body[key] = value.trim();
    }
    let {stateId,state,zone,thana,district,addType} = req.body;
    var errors = [];
    
    if (_.isEmpty(state)) {
        errors.push({fieldName: "state", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "state") });
    }
    
    if (_.isEmpty(stateId)) {
        errors.push({fieldName: "stateId", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "stateId") });
    }

    if (_.isEmpty(addType)) {
        errors.push({fieldName: "addType", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "addType") });
    }
    
    if(addType=="1"||addType==1){       //zone add
        if (_.isEmpty(zone)) {
            errors.push({fieldName: "zone", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "zone") });
        }
    }
    
    if(addType=="2"||addType==2){      //district add
        if (_.isEmpty(zone)) {
            errors.push({fieldName: "zone", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "zone") });
        }
        if (_.isEmpty(district)) {
            errors.push({fieldName: "district", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "district") });
        }
    }
    
    if(addType=="3"||addType==3){       //thana add
        if (_.isEmpty(zone)) {
            errors.push({fieldName: "zone", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "zone") });
        }
        if (_.isEmpty(district)) {
            errors.push({fieldName: "district", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "district") });
        }
        if (_.isEmpty(thana)) {
            errors.push({fieldName: "thana", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "thana") });
        }
    }
    
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
};


var validateStatusChange = function(req,res,next){
    let {zoneId,status} = req.body;
    var errors = [];

    if (_.isEmpty(zoneId)) {
        errors.push({fieldName: "zoneId", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "zoneId") });
    }
    
    if (_.isEmpty(status)) {
        errors.push({fieldName: "status", message: constant.MESSAGES.KEY_CANT_EMPTY.replace("{{key}}", "status") });
    }
    
    if (errors && errors.length > 0) {
        validationError(errors, next);
    }
    next();
}

var validationError = function (errors, next) {
    if (errors && errors.length > 0) {
        return next(exceptions.getCustomErrorException(constant.MESSAGES.VALIDATION_ERROR, errors))
    }
    next();
}

//========================== Export Module Start ===============================
module.exports = {
    validateCreate,
    validateStatusChange
  };
//========================== Export module end ==================================