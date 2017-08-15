myApp.controller('ChallengeController', ['$http','UserService', function($http, UserService) {
  console.log('ChallengeController created');
  var vm = this;
  vm.userService = UserService;
  getChallenges();

  vm.difficulty = [
    {level : "Easy"},
    {level : "Normal"},
    {level : "Hard"}
  ];

  // getting all documents from the challenge collection
  function getChallenges(){
    $http.get('/challenge').then(function(response){
      console.log('challenge data:', response.data);
      vm.challengeList = response.data;
    });
  }
  // adding a new document to the challenge collection
  vm.createChallenge = function (title, category){
    var newChallenge = {
      title : title,
      category : category
    };
    console.log("new challenge data:", newChallenge );
    $http.post('/challenge', newChallenge).then(function(response) {
      //clearing the title and category input fields
      console.log('post working', response);
      vm.title = '';
      vm.category = '';
      getChallenges();
    });
  };

  vm.completeChallenge = function(challenge){
    console.log('completeChallenge function');
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    }

    today = mm + '/' + dd + '/' + yyyy;

    challenge.date = today;
    console.log('challenge', challenge.date );
    $http.put('/challenge', challenge).then(function(response) {
      console.log('put response:',response);
    });
  };

  // removing a document from the collection
  vm.deleteChallenge = function(id){
    console.log(id);
    // targeting the specific id
    $http.delete('/challenge/' + id).then(function(response) {
      getChallenges();
    });
  };
}]);
