myApp.controller('ActivityController', ['$http','UserService', function($http, UserService) {
  console.log('ActivityController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.journeyList = vm.userObject.journey;
  vm.globalChallengeList = vm.userObject.globalChallenges;
  vm.userChallengeList = vm.userObject.userChallenges;
console.log('globalChallengeList', vm.globalChallengeList);
console.log('globalChallengeList user object:', vm.userObject.globalChallenges);

getUserJourney();
console.log('globalChallengeList:', vm.globalChallengeList);
// console.log('globalChallengeList response:', response.data.globalChallenges);
// getGlobalChallenges();
// getUserChallenges();
  function getUserJourney(){
    $http.get('/user').then(function(response){
      console.log('challenge data:', response.data);

      vm.userChallengeList = response.data.userChallenges;
      vm.globalChallengeList = response.data.globalChallenges;
    });
  }
  // function getUserChallenges(){
  //   $http.get('/user').then(function(response){
  //     console.log('challenge data:', response.data);
  //     vm.userChallengeList = response.data.userChallenges;
  //   });
  // }
  // function getGlobalChallenges(){
  //   $http.get('/user').then(function(response){
  //     console.log('challenge data:', response.data);
  //     vm.globalChallengeList = response.data.globalChallenges;
  //   });
  // }
}]);
