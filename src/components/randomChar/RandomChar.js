import { useState,useEffect } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../service/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar =()=> {
  const [char,setChar]= useState({});
  const [imgClass,setImgClass]=useState();
  
  const {loading,error,getCharracterId} =useMarvelService();

  useEffect(()=>{
    randomizer();
  },[])

  const updateState = (char) => {
    if (
      char.image ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      setImgClass('contain');  
    } else {
      setImgClass('cover');

    }

    setChar(char);
  };


  const randomizer = () => {
    let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharracterId(id)
      .then(updateState)
      
  };

    const spinner = loading ? <Spinner /> : null;
    const errorM = error ? <ErrorMessage /> : null;
    const view = !(loading || error) ? (
      <View char={char} imgClass={imgClass} />
    ) : null;
  return (
    <div className="randomchar">
      {spinner}
      {errorM}
      {view}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={randomizer}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
  
}
const View = ({ char, imgClass }) => {
  const { image, name, description, wiki, homepage } = char;

  return (
    <div className="randomchar__block">
      <img
        src={image}
        alt="Random character"
        className={`randomchar__img randomchar__img_${imgClass}`}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{ description && description.length>210 ? `${description.slice(0,210)}...` : description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
