export const PORT = 8080;
export const environment = {
    development: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://henrik2:treecko@it2810-11.idi.ntnu.no:27017/pokedb?authSource=pokedb'
    },
    production: {
        serverURL: `http://localhost:${PORT}/`,
        dbString: 'mongodb://henrik2:treecko@it2810-11.idi.ntnu.no:27017/pokedb?authSource=pokedb'
    }
}
