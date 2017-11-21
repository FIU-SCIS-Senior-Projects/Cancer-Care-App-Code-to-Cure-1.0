(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Support_team.IndexController', Controller);

    function Controller(UserService, FlashService, $window) 
    {
        var vm = this;

        vm.user = null;
        vm.addContact = addContact;

        initController();

        function initController() 
        {
            // get current user
            UserService.GetCurrent().then(function (user) 
            {
                vm.user = user;
            });
        }

        function addContact() 
        {
            UserService.Update(vm.user)
                .then(function () 
                {
                    $window.location.reload();
                })
                .catch(function (error) 
                {
                    FlashService.Error(error);
                });
        }
    }

})();