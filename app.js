import api from './gandiapi.js';

api.GetZoneInfo()
	.then( (info) => api.AddNewZoneVersion(info) )
	.then( (target) => api.UpdateNewZoneRecord(target) )
	.then( (target) => api.ChangeTargetVersionZone(target) )
	.then( (info) => api.DeleteOldVersionZone(info) )
	.then( () => api.GetZoneInfo() );