'use strict';

/**
 * @ngdoc service
 * @name mihApp.Fileloader
 * @description
 * # Fileloader
 * Service in the mihApp.
 */
angular.module('mihApp')
  .service('Fileloader', function Fileloader($http,$q) {
        return {

            getFile : function(url){
                var deferred = $q.defer();
                $http.get(url).success(function(data){
                    deferred.resolve(data);
                }).error(function(){
                    deferred.reject("An error occured while fetching file");
                });
    
                return deferred.promise;
            }
        }
  });
