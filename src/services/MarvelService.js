import { _apiKey } from "./apiKey";
import { _apiBase } from "./apiBase";

class MarvelService {
    

    getResourse = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch status: ${res.status}`)
        }//ессли у нас "не успешно" тогда выбросит ошибку 
    
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResourse(`${_apiBase}characters?limit=9&offset=216&apikey=${_apiKey}`)
    }

    getOneCharacter = (id) => {
        return this.getResourse(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
    }
}
export default MarvelService;