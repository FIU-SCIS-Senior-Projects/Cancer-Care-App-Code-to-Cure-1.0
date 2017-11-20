(function () 
{
    'use strict';

    angular
        .module('app')
        .controller('Forum.IndexController', Controller);

    function Controller(PostService, UserService, FlashService, $window) 
    {
        var vm = this;
        vm.posts = [];
        vm.post = {};
        vm.savePost = savePost;
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

        function savePost() {
            var indata = {postData: vm.post, userData: vm.user};
            PostService.Save(indata)
                .then(function () {
                    $window.location.reload();
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });

        }
    }

})();