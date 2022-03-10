//put profile information here
const overview = document.querySelector(".overview");
const username = "megenbacher";
const repoList = document.querySelector(".repo-list");
const repoInfoAppear = document.querySelector(".repos");
const indivRepo = document.querySelector(".repo-data");

const gitHub = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    userInfo(data);
};
gitHub();

const userInfo = function (data) {
    const user = document.createElement("div");
        user.classList.add("user-info");
        user.innerHTML = `
        <figure>
        <img alt="user avatar" src=${data.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
      </div> 
      `;
    
    
    overview.append(user);

    gitRepos();

    
};

const gitRepos = async function () {
    const key = await fetch (`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
    const rep = await key.json();
    console.log(rep);
    repoInformation(rep);
};

const repoInformation = function (repos) {
    for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;

    repoList.append(repoItem);
    }


};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);

    };

});

const specificRepoInfo = async function (repoName) {
    const repo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
        const repoInfo = await repo.json();
        console.log(repoInfo);
    const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData){
        languages.push(language);
        
    }

    displayRepoInfo(repoInfo, languages);

    };

const displayRepoInfo = function (repoInfo, languages) {
    indivRepo.innerHTML = "";
    indivRepo.classList.remove("hide");
    repoInfoAppear.classList.add("hide");
    const element = document.createElement("div");
    element.innerHTML =
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
   
    indivRepo.append(element);
    
    

    
};



