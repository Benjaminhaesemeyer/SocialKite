myApp.controller('ActivityController', function(UserService) {
  console.log('ActivityController created');
  var vm = this;
  vm.userService = UserService;
  UserService.getuser();
  vm.userObject = UserService.userObject;
  vm.journeyList = vm.userObject.journey;
});
