angular.module('creativeRecruitmentApp')
	.service('ProfilerCompanySrv', function ($resource) {
        return $resource('/api/profiler-company/', {}, {
            fetch: {
                method: 'GET'
            },
            'query':  {
            	method:'GET',
            	isArray: true
           	},
            update: {
                method: 'PUT'
            }
        });
    });