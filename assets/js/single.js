// function to the get the repo issues
var getRepoIssues = function (repo) {
  //https://api.github.com/orgs/ORG/issues
  // format above endpoint to use it in fetch().
  // using ?direction=asc to change the direction of issues from descending order to accenting order.
  console.log(repo);
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    } else {
      alert("There was a problem with your request");
    }
  });
};
getRepoIssues("facebook/react");

/