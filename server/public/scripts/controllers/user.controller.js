myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.currentNavItem = 'page3';

  var flkty = new Flickity( '.main-gallery', {
  // options
  cellAlign: 'left',
  contain: true
});
});
