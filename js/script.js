//put profile information here
const overview = document.querySelector(".overview");
const username = "megenbacher";

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

    
};

