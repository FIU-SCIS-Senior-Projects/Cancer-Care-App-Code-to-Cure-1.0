(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Resource.IndexController', Controller);

    function Controller(ResourceService, UserService, FlashService, $window) 
    {
        var vm = this;
        vm.resources = [];
        vm.resource = {};
        vm.saveResource = saveResource;
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

        function saveResource() {
            var dateString = document.getElementById("date").value;
            vm.resource.date = dateString;

            ResourceService.Save(vm.resource)
                .then(function () {
                    $window.location.reload();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }
    }

})();