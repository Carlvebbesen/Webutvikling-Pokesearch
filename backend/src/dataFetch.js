var axios = require('axios');

useFetchData = async () =>  {
    const pokemonList = [];
    
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1200");
        for (let index = 0; index < response.data.results.length; index++) {
            const element = response.data.results[index];
            const pRes = await sendReq(element.url);
            pokemonList.push(pRes);
        }
    } catch (error) {
        console.log("Something went wrong ;(");
        console.log(error);
    };
    console.log(pokemonList.length);
};

const sendReq = async (url) => {
    return await axios.get(url).catch(el => console.log(el));
}

useFetchData();