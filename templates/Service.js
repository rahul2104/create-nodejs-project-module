"use strict";
const mongoose          = require("mongoose");
const promise           = require("bluebird");
const _                 = require("lodash");

const policeStationDao  = require('./policeStationDao');
//========================== Load Modules End ==============================================

function getStates(params) {
    return policeStationDao.getRange(params)
}

function getByKey(param) {
    return policeStationDao.getByKey(param)
}

function update(query,update) {
    return policeStationDao.update(query,update)
}

function getByKeyAll(param) {
    return policeStationDao.getByKeyAll(param)
}

function isExist(param) {
    if(param.addType=="1"||param.addType==1){   //zone check
        let query={stateName:param.state,rangeName: { $regex: '^'+param.zone+'$', $options: 'i'} }
        if(param.editId){
            query._id={$ne:mongoose.Types.ObjectId(param.editId)}
        }
        return policeStationDao.getByKey(query)
    }
    if(param.addType=="2"||param.addType==2){   //district check
        let query={stateName:param.state,rangeName:param.zone}
        if(param.editId){
            query.district={
                $elemMatch:{
                    _id:{$ne:mongoose.Types.ObjectId(param.editId)},
                    name:{ $regex: '^'+param.district+'$', $options: 'i'}
                }
            }
        }else{
            query.district={$elemMatch:{name:{ $regex: '^'+param.district+'$', $options: 'i'}}}
        }
        return policeStationDao.getByKey(query)
    }
    if(param.addType=="3"||param.addType==3){   //thana check
        let query={stateName:param.state,rangeName:param.zone}
        if(param.editId){
            query.district={
                $elemMatch: {
                    name: param.district, 
                    'thana.name': { $regex: '^'+param.thana+'$', $options: 'i'},
                    'thana._id':{$ne:mongoose.Types.ObjectId(param.editId)} 
                }
            }
        }else{
            query.district={ $elemMatch: { name: param.district, 'thana.name': { $regex: '^'+param.thana+'$', $options: 'i'} } }
        }
        return policeStationDao.getByKey(query)
    }
    
}

function create(param) {
    if(param.addType=="1"||param.addType==1){
        return policeStationDao.create(param)
    }else if(param.addType=="2"||param.addType==2){
        let query={stateName:param.state,rangeName:param.zone};
        let update={$push:{'district':{name:param.district}}};
        return policeStationDao.update(query,update)
    }else{
        let query={stateName:param.state,rangeName:param.zone,'district.name':param.district};
        let update={$push:{'district.$.thana':{name:param.thana}}};
        return policeStationDao.update(query,update)
    }
}

function edit(param) {
    if(param.addType=="1"||param.addType==1){
        let query={"_id":param.editId};
        let update={rangeName:param.zone};
        return policeStationDao.update(query,update)
    }else if(param.addType=="2"||param.addType==2){
        let query={stateName:param.state,rangeName:param.zone,"district._id":param.editId};
        let update={$set:{'district.$.name':param.district}};
        return policeStationDao.update(query,update)
    }else{
        let query={stateName:param.state,rangeName:param.zone,'district.name':param.district,"district.thana._id":param.editId};
        let update={$set:{'district.$[outer].thana.$[inner].name':param.thana}};
        let option={arrayFilters: [
                { "outer.name": param.district },
                { "inner._id": param.editId }
            ]}
        return policeStationDao.update(query,update,option)
    }
}

//========================== Export Module Start ==============================
module.exports = {
    getStates,
    getByKey,
    update,
    getByKeyAll,
    isExist,
    create,
    edit
}
//========================== Export Module End ===============================
