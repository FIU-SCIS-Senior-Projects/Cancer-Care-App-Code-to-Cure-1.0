(function () 
{
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) 
    {
        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', 
            {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }
            })
            .state('account', 
            {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('resources', 
            {
                url: '/resources',
                templateUrl: 'resources/index.html',
                controller: 'Resources.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'resources' }
            })
            .state('scheduler', 
            {
                url: '/scheduler',
                templateUrl: 'scheduler/index.html',
                controller: 'Scheduler.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'scheduler' }
            })
            .state('inbox', 
            {
                url: '/inbox',
                templateUrl: 'inbox/index.html',
                controller: 'Inbox.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'inbox' }
            })
            .state('message_read', 
            {
                url: '/message_read',
                templateUrl: 'message_read/index.html',
                controller: 'Message_read.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'message_read' }
            })
            .state('alert_read', 
            {
                url: '/alert_read',
                templateUrl: 'alert_read/index.html',
                controller: 'Alert_read.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'alert_read' }
            })
            .state('compose_message', 
            {
                url: '/compose_message',
                templateUrl: 'compose_message/index.html',
                controller: 'Compose_message.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'compose_message' }
            })
            .state('alerts', 
            {
                url: '/alerts',
                templateUrl: 'alerts/index.html',
                controller: 'Alerts.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'alerts' }
            })
            .state('forum', 
            {
                url: '/forum',
                templateUrl: 'forum/index.html',
                controller: 'Forum.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'forum' }
            })
            .state('events', 
            {
                url: '/events',
                templateUrl: 'events/index.html',
                controller: 'Events.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'events' }
            })
            .state('medical_profile', 
            {
                url: '/medical_profile',
                templateUrl: 'medical_profile/index.html',
                controller: 'Medical_profile.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'medical_profile' }
            })
            .state('support_team', 
            {
                url: '/support_team',
                templateUrl: 'support_team/index.html',
                controller: 'Support_team.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'support_team' }
            })
            .state('support', 
            {
                url: '/support',
                templateUrl: 'support/index.html',
                controller: 'Support.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'support' }
            })
            .state('forum_detail', {
                url: '/forum_detail',
                templateUrl: 'forum_detail/index.html',
                controller: 'Forum_detail.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'forum_detail' }
            });

    }

    function run($http, $rootScope, $window) 
    {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) 
        {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();