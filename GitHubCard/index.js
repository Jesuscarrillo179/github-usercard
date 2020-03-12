/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

axios.get('https://api.github.com/users/Jesuscarrillo179/followers')
.then( response => {
  console.log(response.data);
  const personUrl = response.data.map(obj => obj.url);
  console.log(personUrl);
  personUrl.forEach(obj =>
    axios.get(obj)
    .then( response => {
      console.log(response.data);
      document.querySelector('.cards').appendChild(createCard(response.data));
    })
    .catch( error => {
      console.log('there was an another error! fix this!',error)
    })
    );
})
.catch( error => {
  console.log('there was an another error! fix this!',error)
});

axios.get('https://api.github.com/users/Jesuscarrillo179')
.then( response => {
  console.log(response.data);
  document.querySelector('.cards').appendChild(createCard(response.data));
})
.catch( error => {
  console.log('there was an error! fix this!',error)
});


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function createCard(info){
  //parent div
  const profileCard = document.createElement('div');
  profileCard.classList.add('card');
  
  //img
  const profileImg = document.createElement('img');
  profileImg.setAttribute('src' , info.avatar_url);

  //info child div
  const infoCard = document.createElement('div');
  infoCard.classList.add('card-info');

  //h3
  const title = document.createElement('h3');
  title.classList.add('name');
  title.textContent = info.name;

  //p username
  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = info.login;

  //p location
  const location = document.createElement('p');
  location.textContent = "Location: " + info.location;

  //p profile
  const profile = document.createElement('p');
  profile.textContent = "Profile: ";

  //a link
  const githubLink = document.createElement('a');
  githubLink.setAttribute('href', info.html_url);
  githubLink.textContent = info.html_url;

  //p followers
  const followers = document.createElement('p');
  followers.textContent = "Followers: " + info.followers;

  //p following
  const following = document.createElement('p');
  following.textContent = "Following: " + info.following;
  //pbio
  const bio = document.createElement('p');
  bio.textContent = "Bio: " + info.bio;

  //structure
  profileCard.appendChild(profileImg);
  profileCard.appendChild(infoCard);
  infoCard.appendChild(title);
  infoCard.appendChild(username);
  infoCard.appendChild(location);
  infoCard.appendChild(profile);
  profile.appendChild(githubLink);
  infoCard.appendChild(followers);
  infoCard.appendChild(following);
  infoCard.appendChild(bio);

  return profileCard;
};

// let testing = createCard(info);
// Console.log(testing);