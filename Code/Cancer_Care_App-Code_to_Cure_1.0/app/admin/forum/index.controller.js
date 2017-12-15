(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Admin_forum.IndexController', Controller);

    function Controller(PostService, UserService, FlashService, $window) 
    {
        var vm = this;
        vm.posts = [];
        vm.deletePost = deletePost;
        vm.user - null;

        initController();

        function initController() 
        {

            // get current user
            UserService.GetCurrent().then(function (user) 
            {
                vm.user = user;
            });

            // get all posts
            PostService.GetAll().then(function (posts) {
                    vm.posts = posts;
                });
        }

         function deletePost(_id) {
            PostService.Delete(_id)
                .then(function () {
                    $window.location.reload();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();