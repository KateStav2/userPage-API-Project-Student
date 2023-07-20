
class Renderer {
    
    constructor() {
        //this.data 
    }
    
    render = async function (promiseDate) {
        promiseDate
            .then ((result) => {
                let [users, quote, pokemon, about] = result;

                const userInfo = {
                    name: users.results[0].name.first,
                    lastName: users.results[0].name.last,
                    city: users.results[0].location.city,
                    state: users.results[0].location.state,
                    img: users.results[0].picture.thumbnail,
                    aboutUser: about[0],
                    favoriteQuote: {
                        quote: quote.quote,
                        author: "Kanye West"
                    }
                }

                const friends = [];
                for (let i=1; i < users.results.length; i++) {
                    friends.push(users.results[i].name.first + " " + users.results[i].name.last);
                }

                const pokemonInfo = {
                    name: pokemon.name,
                    img: pokemon.sprites.default
                }
                
                let pokemonFeature = pokemon.category.name;
                console.log(pokemonFeature);

                let gifUrl;

                const getGif = async function (searchTest) {
                    const result = await $.get(`http://api.giphy.com/v1/gifs/search?q=${pokemonFeature}&api_key=94E3Q6FGin3bKCRYNN090N0BaYQuHpcX&limit=1$rating=r`, (result) => result)
                    let rnd = Math.floor(Math.random()*result.data.length)
                    let url = `${result.data[rnd].embed_url}`
                    return url;
                }

                const fetchGif = async () => {
                    try {
                        gifUrl = await getGif(pokemonFeature);
                        console.log(gifUrl);
    
                        let userObject = {
                            userInfo: userInfo,
                            friends: friends,
                            favoritePokemon: pokemonInfo,
                            gifUrl: gifUrl
                        };
    
                
                        this.updatePage(userObject);
                
                        // ... (rest of your code)
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
                
                  
                fetchGif();

                console.log('Global GIF URL:', gifUrl);

                //console.log(getUrl)

                // let rnd = Math.floor(Math.random()*gif.data.length)

                // let gif = pokemon
                // .then((result) => {
                //     pokemonFeature = result.result.attributes[0].name;
                //     return $.get(`http://api.giphy.com/v1/gifs/search?q=${pokemonFeature}&api_key=94E3Q6FGin3bKCRYNN090N0BaYQuHpcX&limit=1$rating=r`, (result) => result)
                // })
                // .then((gifResult) => {
                //     console.log(gifResult);
                //     return girResult

                // })



            })
            //.catch ((error) => console.log(error)) 
    }

    updatePage = function (userObject) {

        $(".user-container").empty();
        $(".quote-container").empty();
        $(".pokemon-container").empty();
        $(".meat-container").empty();
        //$("#friends-list").empty();
        $(".friends-container").empty();
        $("#frame").attr("src","")
        
        //console.log(userObject.gifUrl)

        $("#frame").attr("src",userObject.gifUrl)
        //const userObject = await this.getUserObject(promiseDate);
        // render "Quote" section
        const sourceQuote = $("#quote-template").html();
        const templateQuote = Handlebars.compile(sourceQuote);
        $(".quote-container").append(templateQuote(userObject.userInfo.favoriteQuote));

        // render "About me" section
        const sourceAbout = $("#about-template").html();
        const templateAbout = Handlebars.compile(sourceAbout);
        $(".meat-container").append(templateAbout({about: userObject.userInfo.aboutUser}));

        // render "user pic and info" section
        // const user = {
        //     name: users.results[0].name.first,
        //     lastName: users.results[0].name.last,
        //     city: users.results[0].location.city,
        //     state: users.results[0].location.state,
        //     img: users.results[0].picture.thumbnail
        // }
        const sourceUserInfo = $("#user-template").html();
        const templateUser = Handlebars.compile(sourceUserInfo);
        $(".user-container").append(templateUser(userObject.userInfo));

        // render "Friends" section
        // const friends = [];
        // for (let i=1; i < users.results.length; i++) {
        //     friends.push(users.results[i].name.first + " " + users.results[i].name.last);
        // }

        const sourceFrinds = $("#friends-template").html();
        const templateFriends = Handlebars.compile(sourceFrinds);
        $(".friends-container").append(templateFriends({friends: userObject.friends}));

        // render "Pokemon" section
        // let pokemonInfo = {
        //     name: pokemon.name,
        //     img: pokemon.sprites.default
        // }

        const sourcePokemon = $("#pokemon-template").html();
        const templatePokemon = Handlebars.compile(sourcePokemon);
        $(".pokemon-container").append(templatePokemon(userObject.favoritePokemon));

        };
    };
    