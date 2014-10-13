angular.module('creativeRecruitmentApp')
	.service('UserListSrv', function ($resource) {
        return $resource('/api/profiler', {}, {
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
    })
    .service('UserById', function ($resource) {

        return $resource('/api/profiler/:id', {
            userId: "@id"
        }, {
            fetch: {
                method: 'GET',
                transformResponse: function (dataApi) {
                    console.log(dataApi);

                    var data = angular.fromJson(dataApi);

                }
            },
            update: {
                method: 'PUT'
            }

        });

    });