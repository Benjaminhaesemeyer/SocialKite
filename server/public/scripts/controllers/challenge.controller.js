myApp.controller('ChallengeController', ['$http','UserService', function($http, UserService) {
  console.log('ChallengeController created');
  var vm = this;
  vm.userService = UserService;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.userChallengeList = vm.userObject.userChallenges;
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
  vm.createChallenge = function (title, category, count){
    var newChallenge = {
      title : title,
      category : category,
      count: 0
    };
    $http.put('/challenge/new', newChallenge).then(function(response) {
      console.log('put response to add a challenge:',response);
      vm.title = '';
      vm.category = '';
      getChallenges();
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
    $http.put('/challenge', challenge).then(function(response) {
      console.log('put response date:',response);
    });
    console.log('challenge date:', challenge.date );
    $http.put('/challenge/global', challenge).then(function(response) {
      console.log('put response global:',response);
    });
    challenge.count += 1;
    console.log('counter', challenge.count);
    // $http.put('/count', challenge).then(function(response) {
    //   console.log('put response global count:',response);
    // });
    console.log('logging challenge',challenge);
    $http.put('/count/new', challenge).then(function(response) {
      console.log('put response count:',response);
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
