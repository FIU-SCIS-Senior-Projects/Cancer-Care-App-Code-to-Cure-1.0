(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Admin_resources.IndexController', Controller);

    function Controller(ResourceService, UserService, FlashService, $window) 
    {
        var vm = this;
        vm.resources = [];
        vm.deleteResource = deleteResource;
        vm.user - null;

        initController();

        function initController() 
        {

            // get current user
            UserService.GetCurrent().then(function (user) 
            {
                vm.user = user;
            });

            // get all resources
            ResourceService.GetAll().then(function (resources) {
                    vm.resources = resources;
                });
        }

         function deleteResource(_id) {
            ResourceService.Delete(_id)
                .then(function () {
                    $window.location.reload();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();