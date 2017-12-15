(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Admin_users.IndexController', Controller);

    function Controller(UserService, FlashService, $window) 
    {
        var vm = this;
        vm.users = [];
        vm.deleteUser = deleteUser;
        vm.user - null;

        initController();

        function initController() 
        {

            // get current user
            UserService.GetCurrent().then(function (user) 
            {
                vm.user = user;
            });

            // get all users
            UserService.GetAll().then(function (users) {
                    vm.users = users;
                });
        }

         function deleteUser(_id) {
            UserService.Delete(_id)
                .then(function () {
                    $window.location.reload();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();