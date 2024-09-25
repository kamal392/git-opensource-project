// create function to get user repos

var getUserRepos = function () {
  fetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();
