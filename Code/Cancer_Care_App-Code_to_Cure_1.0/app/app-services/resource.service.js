(function () 
{
    'use strict';

    angular
        .module('app')
        .factory('ResourceService', Service);

    function Service($http, $q) 
    {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() 
        {
            return $http.get('/api/resources').then(handleSuccess, handleError);
        }
        function GetById(_id) 
        {
            return $http.get('/api/resources/' + _id).then(handleSuccess, handleError);
        }
        function Save(resource) {
            return $http.post('/api/resources', resource).then(handleSuccess, handleError);  
        }
        function Update(resource) {
            return $http.put('/api/resources/' + resource.resourceData._id, resource).then(handleSuccess, handleError);
        }
        function Delete(_id) 
        {
            return $http.delete('/api/resources/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) 
        {
            return res.data;
        }

        function handleError(res) 
        {
            return $q.reject(res.data);
        }
    }

})();
