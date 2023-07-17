const api = new APIManager();
//api.initialise();
//console.log(api);

const renderer = new Renderer();

let currentUserId = 0;
localStorage.clear();

Handlebars.registerHelper("properCase", function(text) {
    //let text = 'one two three';
    let words = text.data.root.name.split('-');

    capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());
    capitalizedText = capitalizedWords.join('-');

    return capitalizedText;
  });

function generateUser(){
    //let userObject = renderer.getUserObject(api.initialise());
    renderer.render(api.initialise());
}

function saveUser(){

    let savedUsersString = localStorage.getItem("savedUsers");
    let savedUsers;
    if (savedUsersString !== null) {
        savedUsers = JSON.parse(savedUsersString) || [];
    } else {
        savedUsers = [];
    }

    let currentUserString = localStorage.getItem("currentUser");

    if(currentUserString === null) {
        return;
    }

    let currentUser = JSON.parse(currentUserString);

    currentUserId += 1;
    currentUser["id"] = currentUserId;
    currentUser["name"] = currentUser.userInfo.name;
    currentUser["lastName"] = currentUser.userInfo.lastName;

    savedUsers.push(currentUser);
    
    let updatedUsers = JSON.stringify(savedUsers);

    localStorage.setItem("savedUsers", updatedUsers);

    // create updated drop-down list
    $("#users").empty();
    let sourceUsers = $("#users-template").html();
    let templateUsers = Handlebars.compile(sourceUsers);
    $("#users").append(templateUsers({savedUsers: savedUsers}));
    $("#users").val(currentUserId);
}

function loadUser(){
    let savedUsersString = localStorage.getItem("savedUsers");
    if (savedUsersString === null) return; 

    let savedUsers = JSON.parse(savedUsersString);

    let userId = $("#users").val();
    if (typeof userId === 'undefined') return;

    let user = savedUsers.filter((user) => user.id == userId)[0]

    renderer.updatePage(user);

}