myApp.controller('ActivityController', function(UserService) {
  console.log('ActivityController created');
  var vm = this;
  vm.userService = UserService;
});
