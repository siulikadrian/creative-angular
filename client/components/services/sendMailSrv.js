/**
 * Created by Adrian Siulik on 2014-11-18.
 */
angular.module('creativeRecruitmentApp')
  .service('sendMailSrv', function ($resource) {
    return $resource('/api/mail/:email', {
      email: "@email"
    }, {
      fetch: {
        method: 'GET'
      }
    });
  });
