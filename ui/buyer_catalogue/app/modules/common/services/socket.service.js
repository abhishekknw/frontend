'use strict';
// var config = require('../config');

(function () {
    angular.module('catalogueApp')
        .service('socketService', SocketService);

    function SocketService($rootScope, $http) {
        var service = {};
        var pathClientConfig;
        let configFile = "";
        service = {
            socket: null,
            addListenerNotifications: addListenerNotifications,
            disconnect:disconnect,
            connect:connect
        };

        if(window.location.href.indexOf('/admin/#') !== -1){
            pathClientConfig = '../' + configFile;
        } else {
            pathClientConfig = configFile;
        }

       function connectToUrl(){
        $http.get(pathClientConfig)
        .then(function(res) {
            var url = res.data.socket_url;
            service.socket = io.connect(url);
        });
       }

        function addListenerNotifications(teams) {
            service.socket.on(userId, function (data) {
                $rootScope.$broadcast('newNotification', data);
                console.log("TESTING")
            })
        }
        function connect(){
            alert("connect call")
            $http.get(pathClientConfig)
            .then(function(res) {
                var url = res.data.socket_url;
                service.socket = io.connect(url);
                console.log(service.socket,"111111111111")
            });
        }

        function disconnect(){
            service.socket.disconnect();
        }

        return service;

    }
})();
// var socket = io.connect(),
// disconnecting = false;

// return {
// on: function (eventName, callback) {
// socket.on(eventName, function () {  
//   var args = arguments;
//   if (!disconnecting) {
//     $rootScope.$apply(function () {
//       callback.apply(socket, args);
//     });
//   } else {
//     callback.apply(socket, args);
//   }
// });
// },
// emit: function (eventName, data, callback) {
// socket.emit(eventName, data, function () {
//   var args = arguments;
//   $rootScope.$apply(function () {
//     if (callback) {
//       callback.apply(socket, args);
//     }
//   });
// })
// },
// disconnect: function () {
// disconnecting = true;
// socket.disconnect();
// },
// socket: socket
// }