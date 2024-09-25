// create function to get user repos
var getUserRepos = function (user) {
  //format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  // make a request to the url .fetch api return promise object , we then add then method to the promise object.
  fetch(apiUrl).then(function (response) {
    //jason method return a promise so we need to add another then()
    response.json().then(function (data) {
      console.log(data);
    });
  });
};
console.log("outside");
getUserRepos("kamal392");
