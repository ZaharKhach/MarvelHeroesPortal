import { _apiBase, _apiKey, _offset } from "./apiValues";

import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const getAllCharacters = async (offset = _offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getOneCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getOneCharByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (issueNumber = 55, offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&issueNumber=${issueNumber}&apikey=${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const getOneComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
        // console.log( _transformComic(res.data.results[0]));
        return _transformComic(res.data.results[0]);
    }

    const _transformComic = (char) => {
        if (char.prices[0].price === 0) char.prices[0].price = 'NOT AVAILABLE';
        if (char.description === null) char.description = 'Description not found';

        return {
            id: char.id,
            image: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            title: char.title,
            price: char.prices[0].price == 'NOT AVAILABLE' ? char.prices[0].price : `${char.prices[0].price}$` ,
            description: char.description,
            pages: char.pageCount
        }
    }

    const _transformCharacter = (char) => {
        if ( typeof char == "undefined") return;

        if (char.description.length === 0) char.description = 'Description not found';

        return {
            id: char.id,
            name: char.name,
            description: char.description.length > 220 ? char.description.substring(0, 156) + "..." : char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return { loading, error, getAllCharacters, getOneCharacter, getComics, getOneComic, getOneCharByName}
}
export default useMarvelService;