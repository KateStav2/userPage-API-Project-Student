//This is the class that will manage all your APIs

class APIManager {
    constructor() {
        this.data = {}
    }
    // methods
    initialise () {
        let users, quote, pokemon, about;
        users = $.get('https://randomuser.me/api/?inc=name,location,picture&results=7', (result) => result)
            // .then((res) => {
            //     console.log(res);
            // })
        quote = $.get('https://api.kanye.rest', (result) => result)
            // .then((res) => {
            //     console.log(res);
            // })

        const pokTotal = 949;
        const pokId = Math.floor(Math.random() * pokTotal);
        pokemon = $.get(`https://pokeapi.co/api/v2/item/${pokId}`, (result) => result)
            // .then((res) => {
            //     console.log(res);
            // })
        about = $.get(`https://baconipsum.com/api/?type=meat-and-filler&sentences=3`, (result) => result)
            // .then((res) => {
            //     console.log(res);
            // })
        
        //console.log(users);
        
        return Promise.all([users, quote, pokemon, about]);
    }
}
