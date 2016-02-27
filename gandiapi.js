const fs = require('fs');
const xmlrpc = require('xmlrpc');
const api = xmlrpc.createSecureClient({
	host: 'rpc.gandi.net',
	port: 443,
	path: '/xmlrpc/'
});
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// Load setting info
const domainInfo = require('./domain_info.json');
var newRecord = require("./target_record.txt");

// Gandiapi functions
var gandiapi = {};
export default gandiapi = {};

gandiapi.GetZoneInfo = () => new Promise(function(resolve, reject) {

	api.methodCall('domain.zone.list', [domainInfo.apikey], function (error, zoneInfo) {
		zoneInfo.map(info => {
			if(info.name===domainInfo.zone){
				console.log(info);
				resolve({
					id:info.id,
					version:info.version
				});
			}
		})
	})

})

gandiapi.AddNewZoneVersion = ({id,version}) => new Promise(function(resolve, reject){

	api.methodCall('domain.zone.version.new', [domainInfo.apikey,id,version], function (error, NewZoneVersion) {
		resolve({
			id:id,
			version:version,
			targetVersion:NewZoneVersion});
	})

})

gandiapi.UpdateNewZoneRecord = ({id,version,targetVersion}) => new Promise(function(resolve, reject){

	if (!targetVersion){
		let error = new Error("targetVersion is not defined");
		console.log(error.stack);
		reject();
	}else{
		console.log('=====');
		console.log(newRecord);
		console.log('=====');
		api.methodCall('domain.zone.record.set', [domainInfo.apikey,id,targetVersion,newRecord], function (error, recordInfo) {
			resolve({
				id:id,
				version:version,
				targetVersion:targetVersion
			})
		})
	}

})

gandiapi.ChangeTargetVersionZone = ({id,version,targetVersion}) => new Promise(function(resolve, reject){

	api.methodCall('domain.zone.version.set', [domainInfo.apikey,id,targetVersion], function (error, status) {
		if (status) {
			console.log('Success: ChangeTargetVersionZone');
			resolve({
				id:id,
				version:version,
				targetVersion:targetVersion
			});
		} else {
			console.log('Fail: ChangeTargetVersionZone');
			reject();
		}
	})

})

gandiapi.DeleteOldVersionZone = ({id,version}) => new Promise(function(resolve, reject){
	
	api.methodCall('domain.zone.version.delete', [domainInfo.apikey,id,version], function (error, status) {
		if (status) {
			console.log('Success: DeleteOldVersionZone');
			resolve();
		} else {
			console.log('Fail: DeleteOldVersionZone');
			reject();
		}
	})

})