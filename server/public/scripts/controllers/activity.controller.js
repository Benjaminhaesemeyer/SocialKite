myApp.controller('ActivityController', ['$http','UserService', function($http, UserService) {
  console.log('ActivityController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.journeyList = vm.userObject.journey;

getUserJourney();

  function getUserJourney(){
    $http.get('/user').then(function(response){
      console.log('challenge data:', response.data);
      vm.journeyList = response.data.journey;
    });
  }
}]);
