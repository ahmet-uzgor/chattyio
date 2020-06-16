app.factory('chatFactory', ['$http', ($http) => {
    const getMessages = (roomId) => {
        return $http({
            url: 'http://me.mydomain.com:3000/messages/list',
            method: 'GET',
            params: {
                roomId
            }
        }).then((response) => {
            return response.data;
        }, (err) => {
            console.log(err);
        })
    }

    return {
        getMessages
    }
}])