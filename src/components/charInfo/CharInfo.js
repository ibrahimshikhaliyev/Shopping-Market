import { useState,useEffect } from "react";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../service/MarvelService";

import "./charInfo.scss";

const CharInfo=({charId})=> {

  const [char,setChar] = useState(null);

  const {loading , error,getCharracterId,clearError}=useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const UpdateChar = () => {
    if (!charId) {
      return;
    }

    clearError(); 

    getCharracterId(charId)
      .then(onCharLoaded)
  };



  useEffect(()=>{

    UpdateChar();
  },[charId]);
 

  const skeleton = char || error || loading ? null : <Skeleton />;
  const spinner = loading ? <Spinner /> : null;
  const errorM = error ? <ErrorMessage /> : null;
  const view = char && !loading && !error ? <View char={char} /> : null;
  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {errorM}
      {view}
    </div>
  );
  
}


const View = ({ char }) => {
  const { name, image, homepage, wiki, comics, description } = char;
  let showComics = "sorry there areno comics available";
  if (comics.length) {
    showComics = comics.slice(0, 10).map((item, i) => {
      return (
        <li className="char__comics-item" key={i}>
          {item.name}
        </li>
      );
    });
  }
  return (
    <>
      <div className="char__basics">
        <img src={image} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{ description.length>210 ? `${description.slice(0,210)}...` : description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{showComics}</ul>
    </>
  );
};
export default CharInfo;
