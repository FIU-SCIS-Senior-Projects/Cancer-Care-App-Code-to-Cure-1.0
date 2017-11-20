(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Events.IndexController', Controller);

    function Controller(EventService, UserService, FlashService, $window) 
    {
        var vm = this;
        vm.events = [];
        vm.event = {};
        vm.saveEvent = saveEvent;
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

        function saveEvent() {
            
            var startDateString = document.getElementById("startDate").value;
            vm.event.startDate = startDateString;
            var endDateString = document.getElementById("endDate").value;
            vm.event.endDate = endDateString;
            var startTimeString = document.getElementById("startTime").value;
            vm.event.startTime = startTimeString;
            var endTimeString = document.getElementById("endTime").value;
            vm.event.endTime = endTimeString;

            var indata = {eventData: vm.event, userData: vm.user};
            EventService.Save(indata)
                .then(function () {
                    $window.location.reload();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }
    }

})();