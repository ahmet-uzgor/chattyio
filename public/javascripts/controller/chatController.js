app.controller('chatController', ['$scope', 'chatFactory', ($scope, chatFactory) => {
    $scope.activeTab = 2;
    $scope.onlineList = {};
    $scope.roomList = {};
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.message = "";
    $scope.messages = {};

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

    $scope.newMessage = () => {
        socket.emit('newMessage', {
            message: $scope.message,
            roomId: $scope.roomId
        });
        $scope.message = "";
    }
    
    $scope.switchRoom = (room) => {
        $scope.chatClicked = true;
        $scope.roomId = room.id;
        $scope.chatName = room.name;

        chatFactory.getMessages(room.id).then((data) => {
            $scope.messages[room.id] = data;
            console.log($scope.messages);
        })
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