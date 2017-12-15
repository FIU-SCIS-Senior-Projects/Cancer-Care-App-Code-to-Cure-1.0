(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Event_detail.IndexController', Controller);

    function Controller($stateParams, $window, UserService, EventService, FlashService) 
    {
        var vm = this;

        vm.event = {};
        vm.user = null;
        vm.joinEvent = joinEvent;

        initController();

        function initController() 
        {

            // get current user
            UserService.GetCurrent().then(function (user) 
            {
                vm.user = user;
            });

            // get event
            if ($stateParams._id) {
                EventService.GetById($stateParams._id)
                    .then(function (event) {
                        vm.event = event;
                    });
            }
        }

        function joinEvent() {
            var indata = {eventData: vm.event, userData: vm.user};
            EventService.Update(indata)
                .then(function () {
                    FlashService.Success("Joined Event");
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }
    }

})();