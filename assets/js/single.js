// create reference to dom element(issues container)
var issueContainerEl = document.querySelector("#issues-container");

// function to the get the repo issues
var getRepoIssues = function (repo) {
  // get api endpoint from github api https://api.github.com/orgs/ORG/issues
  // format above endpoint to use it in fetch().
  // using ?direction=asc to change the direction of issues from descending order to accenting order since github provides issues in a descending order.
  //  testing using console.log(repo); to check if the url is providing data.
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data);
        //pas data to the dom function displayIssues
        displayIssues(data);
      });
    } else {
      alert("There was a problem with your request");
    }
  });
};

//convert the fetched data into dom elements and display data in ui
var displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
  }

  for (var i = 0; i < issues.length; i++) {
    //    create a link element to take users to the issues on github
    // create a link so that the issues can be open in a new page.
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    //create a span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    // append to container/link
    issueEl.appendChild(titleEl);
    // create a type element
    var typeEl = document.createElement("span");
    // check if issues is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = "(pull request)";
    } else {
      typeEl.textContent = "(Issues)";
    }
    //append to the link
    issueEl.appendChild(typeEl);
    // append the issue to the container
    issueContainerEl.appendChild(issueEl);
  }
};
// calling getRepoIssues function
getRepoIssues("kamal392/git-it-done");

