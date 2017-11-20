(function () 
{
    'use strict';

    angular
        .module('app')
        .factory('PostService', Service);

    function Service($http, $q) 
    {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Save = Save;
        service.Update = Update;

        return service;

        function GetAll() 
        {
            return $http.get('/api/posts').then(handleSuccess, handleError);
        }
        function GetById(_id) 
        {
            return $http.get('/api/posts/' + _id).then(handleSuccess, handleError);
        }
        function Save(post) {
            return $http.post('/api/posts', post).then(handleSuccess, handleError);  
        }
        function Update(post) {
            return $http.put('/api/posts/' + post.postData._id, post).then(handleSuccess, handleError);
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
