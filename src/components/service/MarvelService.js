import { useHttp } from "../../hooks/http.hook";

const  useMarvelService=()=> {

    const _apiKey = "apikey=daef7f036f5ac9fd9444b3722313b6f2";
    const _offsetBase = 210;

    const {loading,error,request,clearError} = useHttp();


   

    const getAllCharacters = async (offset = _offsetBase) => {
      const allChars = await request(
        `https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&${_apiKey}`
      );
  
      return allChars.data.results.map((item) => {
        return _transformState(item);
      });
    };
  
    const getCharracterId = async (id) => {
      const data = await request(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?${_apiKey}`
      );
      return _transformState(data.data.results[0]);
    };

    const getComicId = async (id) => {
      const data = await request(

        `https://gateway.marvel.com:443/v1/public/comics/${id}?${_apiKey}`
      );
      return _transformComicsChar(data.data.results[0]);
    };


    const getAllComics = async(offset = _offsetBase)=>{
      
      const allComics= await request(
        `https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&${_apiKey}`
      )
        
      return allComics.data.results.map((item)=>{
        return _transformComicsChar(item);
      });
    }

    const getCharByName= async(name)=>{
      const data= await request(`https://gateway.marvel.com:443/v1/public/characters?name=${name}&apikey=daef7f036f5ac9fd9444b3722313b6f2`)
      
      return data.data.count!==0 ? _transformState(data.data.results[0]) : null;
    }

    const _transformState = (char) => {
      return {
        id: char.id,
        name: char.name,
        image: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        description: !char.description
          ? "sorry,no description is available rn"
          : char.description,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
      };
    };

    const _transformComicsChar=(char)=>{
      return {
        id:char.id,
        title:char.title,
        image: `${char.thumbnail.path}.${char.thumbnail.extension}`,
        price: char.prices[0].price
      }
    }


    return { loading,error,getAllCharacters,getCharracterId,clearError,getAllComics,getComicId , getCharByName} ;
}
  
  export default useMarvelService;
  