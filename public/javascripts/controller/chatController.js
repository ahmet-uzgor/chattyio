app.controller('chatController', ['$scope', 'chatFactory', 'userFactory', ($scope, chatFactory, userFactory) => {
    /**
     * Initialization
     */   
    function init(){
        userFactory.getUser().then((user) => {
            $scope.user = user;
        })
    }
    
    init();
    /**
     * Angular variables
     */
    $scope.activeTab = 2;
    $scope.onlineList = {};
    $scope.roomList = {};
    $scope.chatClicked = false;
    $scope.loadingMessages = false;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.message = "";
    $scope.messages = [];
    $scope.user = {};

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
    });

    /**
     * 
     * Client-side functions 
     */
    socket.on('receiveMessage', (message) => {
        $scope.messages[message.roomId].push({
            userId: message.userId,
            username: message.username,
            surname: message.surname,
            message: message.message
        });
        $scope.apply();
    });

    $scope.newMessage = () => {
        if ($scope.message.trim() !== '') {
            socket.emit('newMessage', {
                message: $scope.message,
                roomId: $scope.roomId
            });

            $scope.messages[$scope.roomId].push({
                userId: $scope.user._id,
                username: $scope.user.name,
                surname: $scope.user.surname,
                message: $scope.message,
            });

            $scope.message = "";
        }
    };
    
    $scope.switchRoom = (room) => {
        $scope.chatClicked = true;
        $scope.roomId = room.id;
        $scope.chatName = room.name;
        if (!$scope.messages.hasOwnProperty(room.id)) { // Client memory optimization
            $scope.loadingMessages = true;

            chatFactory.getMessages(room.id).then((data) => {
                $scope.messages[room.id] = data;
                $scope.loadingMessages = false ;
            });
        }
    };

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
}]);