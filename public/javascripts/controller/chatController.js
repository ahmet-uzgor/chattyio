app.controller('chatController', ['$scope',($scope)=>{
    $scope.activeTab = 2;
    $scope.onlineList = {};

    const socket = io.connect("http://me.mydomain.com:3000/");
    socket.on('onlineList', (users) => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    $scope.newRoom = () =>{
        let randomName = Math.random().toString(36).substring(7);
        socket.emit('newRoom', randomName);
    };

    $scope.changeTab = tab =>{
        $scope.activeTab = tab;
    };
}])