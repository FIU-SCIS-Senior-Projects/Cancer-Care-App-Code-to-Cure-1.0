(function () 
{
    'use strict';

    angular
        .module('app')
        .factory('EventService', Service);

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
            return $http.get('/api/events').then(handleSuccess, handleError);
        }
        function Save(event) {
            return $http.post('/api/events', event).then(handleSuccess, handleError);  
        }
        function GetById(_id) 
        {
            return $http.get('/api/events/' + _id).then(handleSuccess, handleError);
        }
        function Update(event) {
            return $http.put('/api/events/' + event.eventData._id, event).then(handleSuccess, handleError);
        }
        function Delete(_id) 
        {
            return $http.delete('/api/events/' + _id).then(handleSuccess, handleError);
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
