import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../service/MarvelService";
import "./ComicsList.scss";


const ComicsList =()=>{

    const [chars,setChars] = useState([])
    const [offset,setOffset] =useState(210);
    const [newCharsLoading,setNewCharsLoading] = useState(false);
    const [pageEnded,setPageEnded] = useState(false);


    const {loading,error,getAllComics} = useMarvelService();
    
    useEffect(()=>{
        onComicsUpdate(offset,true);
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
        if (pageEnded && !newCharsLoading && !loading && !error) {
            onComicsUpdate(offset);
        }
      };

    const onComicsUpdate=(offset,initial=false)=>{
        initial ? setNewCharsLoading(false) : setNewCharsLoading(true);
        getAllComics(offset)
            .then(data=>onUpdateState(data))
    }
 
    const onUpdateState=(data)=>{
        setChars(chars=>[...chars,...data])
        setOffset(offset=>offset+8)
        setPageEnded(false)
        setNewCharsLoading(false)
    }

    const onRenderItems=(items)=>{
        const allchars= items.map((item,i)=>{
            const {image,title,price,id}=item;
            return (
                    
                <Link 
                    to={`/comics/${id}`}
                    tabIndex={0}
                    className="comics_item"
                    key={i}
                >
                    <div className="comics_item_image"><img src={image} alt="" /></div>
                    <div className="comics_item_title">{title}</div>
                    <div className="comics_item_price">{price}$</div>
                </Link>
                    
            )
        })

        return allchars;
    }


    

    const spinner= loading && !error && !newCharsLoading? <Spinner/> : null;
    const errorM=error? <ErrorMessage/>:null;
    const some=onRenderItems(chars);

    return(
        <div className="comics">
            {spinner}
            {errorM}
            <ul className="comics_grid">
                {some}
            </ul>
           
            <button className='button button__long'>
                    {newCharsLoading ? <Spinner/> : null}
            </button>
            
        </div>
    
    )
}


export default ComicsList;