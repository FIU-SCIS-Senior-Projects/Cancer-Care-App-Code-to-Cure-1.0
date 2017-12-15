(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Admin_events.IndexController', Controller);

    function Controller(EventService, UserService, FlashService, $window) 
    {
        var vm = this;
        vm.events = [];
        vm.deleteEvent = deleteEvent;
        vm.user - null;

        initController();

        function initController() 
        {

            // get current user
            UserService.GetCurrent().then(function (user) 
            {
                vm.user = user;
            });

            // get all events
            EventService.GetAll().then(function (events) {
                    vm.events = events;
                });
        }

         function deleteEvent(_id) {
            EventService.Delete(_id)
                .then(function () {
                    $window.location.reload();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();