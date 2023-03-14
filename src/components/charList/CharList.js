import "./charList.scss";
import { useState,useEffect } from "react";
import useMarvelService from "../service/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList=({UpdateStateOfApp})=> {


  const [chars,setChars]=useState([]);
  const [offset,setOffset]=useState(1450);
  const [newCharsLoading,setNewCharsLoading]=useState(false);
  const [ended,setEnded]=useState(false);
  const [pageEnded,setPageEnded]=useState(false);
  const [renderChars,setRenderChars] = useState(false);

  const {loading,error,getAllCharacters} = useMarvelService();


  useEffect(()=>{
    onAddNewChars(offset,true);
  },[])

  useEffect(()=>{
    window.addEventListener("scroll", checkPageEnded);
    window.addEventListener("scroll", onUpdateCharListByScroll);

    return ()=>{
      window.removeEventListener("scroll", checkPageEnded);
      window.removeEventListener("scroll", onUpdateCharListByScroll);
    }
  })

  const checkPageEnded = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.offsetHeight - 3
    ) {
      setPageEnded(true)
    }
  };
  
  const onUpdateCharListByScroll = () => {
    if (pageEnded && !newCharsLoading && !ended && !loading && !error) {
      onAddNewChars(offset);
      setRenderChars(true);
    }
  };

  
  const onAddNewChars = (offset,initial) => {

    initial ? setNewCharsLoading(false) : setNewCharsLoading(true);
    

    getAllCharacters(offset)
      .then(UpdateStateAllChars)
      
  };

  


  const UpdateStateAllChars = (newChars) => {
    let endeds = newChars.length < 9 ? true : false;

    setChars(chars=>[...chars, ...newChars]);
    setOffset(offset=>offset+9);
    setPageEnded(false);
    setNewCharsLoading(false);
    setEnded(ended=>endeds);
    setRenderChars(false);

  };




  const itemRefs = [];

  const setRef = (ref) => {
      itemRefs.push(ref);
  }

  const focusOnItem = (id) => {
      itemRefs.forEach(item => item.classList.remove('char__item_selected'));
      itemRefs[id].classList.add('char__item_selected');
      itemRefs[id].focus();
  }

  const renderItems=(allChars)=> {
    const charsList = allChars.map((item,i) => {
      let imgClass = { objectFit: "cover" };
      if (
        item.image ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgClass = { objectFit: "unset" };
      }
      return (
        <li
          className="char__item" 
          tabIndex={0}
          ref={setRef}
          key={item.id}
          onClick={(e) => {
            UpdateStateOfApp(item.id);
            focusOnItem(i)
            
          }}

          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === "Enter") {
              UpdateStateOfApp(item.id);
              focusOnItem(i);
            }
          }}
        >
          <img src={item.image} alt="abyss" style={imgClass} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    

    return <ul className="char__grid">{charsList}</ul>;
  }

  const items = renderItems(chars);
  const view = !error ? items : null ;
  const load = loading && !newCharsLoading ? <Spinner /> : null;
  const erroR = error ? <ErrorMessage /> : null;
  const some=renderChars ? <Spinner/> :null;
  return (
    <div className="char__list">
      {load}
      {erroR}
      {view}
      
      <div className="char__loading">
          {some}
      
      </div>
    </div>
  );
  
}

export default CharList;
