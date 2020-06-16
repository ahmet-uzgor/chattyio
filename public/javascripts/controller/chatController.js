app.controller('chatController', ['$scope',($scope)=>{
    $scope.activeTab = 2;
    $scope.onlineList = {};
    $scope.roomList = {};
    $scope.chatClicked = false;
    $scope.chatName = "";

    /**
     * Client-side Socket event handling
     */
    const socket = io.connect("http://me.mydomain.com:3000/");
    socket.on('onlineList', (users) => {
        $scope.onlineList = users;
        $scope.$apply();
    });

    socket.on('roomList', (rooms) => {
        $scope.roomList = rooms;
        $scope.$apply();
    })

    $scope.switchRoom = (room) => {
        $scope.chatClicked = true;
        $scope.chatName = room.name;
    }

    $scope.newRoom = () =>{
        //let randomName = Math.random().toString(36).substring(7);
        
        let roomName = window.prompt("Please enter room name");
        if (roomName !== null && roomName.length >= 3){
            socket.emit('newRoom', roomName);
        }else{
            window.alert('You entered any things or less than 3 characters');
        }
        
    };

    $scope.changeTab = tab =>{
        $scope.activeTab = tab;
    };
}])