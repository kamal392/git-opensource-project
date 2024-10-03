//create variable to store reference to the form and user input
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
// container(contains owner name ,repo name and issues)
var repoContainerEl = document.querySelector("#repos-container");
// repoSearchTermEl references to the user name
var repoSearchTermEl = document.querySelector("#repo-search-term");
// create a variable to store reference to the buttons
var languageButtonsEl = document.querySelector("#language-buttons");

// functions for the app
// formSubmitHandler function to handle the form
var formSubmitHandler = function (event) {
  event.preventDefault();
  // get the value of user input
  var username = nameInputEl.value.trim();
  if (username) {
    getUserRepos(username);
    // working with the input data user , always make sure to clear out the old content before display the new content.

    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

// create a function to handle button clicked
var buttonClickHandler = function (event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");
  // console.log(language);
  // check if the use has selected the language or not if user selected the language call getFeatureRepo function
  if (language) {
    getFeatureRepos(language);
  }
  //clear old content
  repoContainerEl.textContent = "";
};

// create function to get user repos
var getUserRepos = function (user) {
  //format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";
  // make a request to the url .fetch api return promise object , we then add then method to the promise object.
  fetch(apiUrl)
    .then(function (response) {
      // when the request status code is something in the 200s, the ok property wil be true.
      if (response.ok) {
        //JSON method return a promise so we need to add another then()
        response.json().then(function (data) {
          //passing data to displayRepos function
          displayRepos(data, user);
        });
      } else {
        alert("Error:GitHub User Not Found");
      }
    })
    // if there is any internet issue the catch function will handle the error.
    .catch(function (error) {
      alert("unable to connect to Github");
    });
};

// function to display repos ,response data will be converted to JSON ,it will be sent from getUserRepos() to displayRespo().
// repos is an array of objects , each object is a repo
var displayRepos = function (repos, searchTerm) {
  //  check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    // return statement stop the execution of the function.
    return;
  }
  // working with the input data user , always make sure to clear out the old content before display the new content.
  repoContainerEl.textContent = "";
  repoSearchTermEl.textContent = searchTerm;
  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    // create a container for each loop
    // var repoEl = document.createElement("div"); converting this div element to a link element
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    // added link to repo so that when a user click on the repo it will the take the issues correspondents to the repos
    //adjust the href value so the the user can see the issues associated with selected repo
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    //create span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";
    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        //using <i> to add the icons
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    //  append status to the
    repoEl.appendChild(statusEl);
    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

//create a function that accept language a as a parameter to display featured repository for a selected repos
var getFeatureRepos = function (language) {
  // "https://api.github.com/search/repositories?q=Q"
  // format the search api point we got from github api endpoints

  var apiUrl =
    "https://api.github.com/search/repositories?q=" +
    language +
    "+is:featured&sort=help-wanted-issues";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      // console.log(response);
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error:Github User Not Found");
    }
  });
};

// add submit event listener to the userFormEl
userFormEl.addEventListener("submit", formSubmitHandler);
// add event listener to the div element that holds 3 buttons (using delegation )
languageButtonsEl.addEventListener("click", buttonClickHandler);
