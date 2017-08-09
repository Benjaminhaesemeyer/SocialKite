myApp.controller('ChallengeController', ['$http','UserService', function($http, UserService) {
  console.log('ChallengeController created');
  var vm = this;
  vm.userService = UserService;
  getChallenges();

  function getChallenges(){
    console.log('getChallenges() ran');
    $http.get('/challenge').then(function(response){
      console.log('challenge data:', response.data);
      vm.challengeList = response.data;
    });
  }

function createChallenge(){

}

}]);
