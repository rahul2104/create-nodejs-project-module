// Importing mongoose
var mongoose = require("mongoose");
var constants = require("../../../constant");
var Schema = mongoose.Schema;

var StatesSchema = new Schema({
    countryId:{ type: Schema.Types.ObjectId, ref: constants.DB_MODEL_REF.COUNTRIES },
    stateId:{ type: Schema.Types.ObjectId, ref: constants.DB_MODEL_REF.STATES },
    stateName: { type: String,index:true},
    rangeName: { type: String,index:true},
    districtName: { type: String },
    thana: [{
            id:{ type: Number },
            name:{ type: String}, 
            status: {type: Number, default: 1}, 
        }],
    district:[
        {
            name:{type: String},
            status: {type: Number, default: 1}, 
            thana: [{
                name:{ type: String},
                status: {type: Number, default: 1}, 
            }]
        }  
    ],
    lat: { type: Number },
    long: { type: Number },
    status: {type: Number, default: 1}, 
    created: { type: Date, default: Date.now },
    updated: { type: Date },
});

//Export States module
module.exports = mongoose.model(constants.DB_MODEL_REF.POLICESTATION, StatesSchema);
