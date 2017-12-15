(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Forum_detail.IndexController', Controller);

    function Controller($stateParams, $window, UserService, PostService, FlashService) 
    {
        var vm = this;

        vm.post = {};
        vm.user = null;
        vm.createComment = createComment;

        initController();

        function initController() 
        {

            // get current user
            UserService.GetCurrent().then(function (user) 
            {
                vm.user = user;
            });

            // get post
            if ($stateParams._id) {
                PostService.GetById($stateParams._id)
                    .then(function (post) {
                        vm.post = post;
                    });
            }
        }

        function createComment() {
            var indata = {postData: vm.post, userData: vm.user};
            PostService.Update(indata)
                .then(function () {
                    $window.location.reload();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }
    }

})();