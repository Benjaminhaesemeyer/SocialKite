myApp.controller('ChallengeController', ['$http','UserService', function($http, UserService) {
  console.log('ChallengeController created');
  var vm = this;
  vm.userService = UserService;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.userChallengeList = vm.userObject.userChallenges;
  vm.globalChallengeList = vm.userObject.globalChallenges;
  getChallenges();
  vm.difficulty = [
    {level : "Easy"},
    {level : "Normal"},
    {level : "Hard"},
    {level : "My Challenges"}
  ];

  // creating carousel with Flickity constructor
  var flkty = new Flickity( '.challengeGallery', {
    // options
    cellAlign: 'left',
    contain: true
  });

  // getting all documents from the challenge collection
  function getChallenges(){
    $http.get('/challenge').then(function(response){
      console.log('challenge data:', response.data);
      vm.challengeList = response.data;
    });
  }
  // adding a new document to the challenge collection
  vm.createChallenge = function (title){
    var newChallenge = {
      title : title,
      count: 0
    };
    $http.put('/challenge/new', newChallenge).then(function(response) {
      console.log('put response to add a challenge:',response);
      vm.title = '';
      getUserChallenges();
    });
  };

getUserChallenges();
  function getUserChallenges(){
    $http.get('/user').then(function(response){
      console.log('get user challenge data:', response.data);
      vm.userChallengeList = response.data.userChallenges;
    });
  }

  vm.completeMyChallenge = function(challenge){
    console.log('completeChallenge function');

    // creating date format to add to completed Challenges
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
    // assinging date property to challenge schema
    challenge.date = today;
    challenge.count += 1;
    console.log('logging challenge',challenge);
    $http.put('/count/new', challenge).then(function(response) {
      console.log('put response count:',response);
    });
  };

  vm.completeChallenge = function(challenge){
    console.log('completeChallenge function');

    // creating date format to add to completed Challenges
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
    // assinging date property to challenge schema
    challenge.date = today;
    challenge.count += 1;
    console.log('logging challenge',challenge);
    $http.put('/challenge/global', challenge).then(function(response) {
      console.log('put response global:',response);
    });
  };


  // NEEDS TO BE FIXED
  vm.deleteChallenge = function(challenge){
    console.log('Delete challenge:', challenge);
    // targeting the specific id
    $http.put('/challenge/delete', challenge).then(function(response) {
      getUserChallenges();
});
  };
}]);
