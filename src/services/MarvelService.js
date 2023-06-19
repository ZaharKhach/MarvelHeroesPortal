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

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getOneCharacter = async (id) => {
        const res = await this.getResourse(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        if(char.description.length === 0) char.description = 'Description not found';

        return {
            name: char.name,
            description: char.description.length > 220 ? char.description.substring(0, 156) + "..." : char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}
export default MarvelService;