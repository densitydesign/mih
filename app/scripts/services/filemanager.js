'use strict';

/**
 * @ngdoc service
 * @name mihApp.filemanager
 * @description
 * # filemanager
 * Factory in the mihApp.
 */
angular.module('mihApp')
  .factory('filemanager', function ($http, $q) {
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
        };
  });
