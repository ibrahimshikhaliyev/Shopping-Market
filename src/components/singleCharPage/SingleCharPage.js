import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import useMarvelService from "../service/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './singleCharPage.scss';

const SingleCharPage=({param})=>{
    const [data,setData]= useState({});
    const {loading,error,getCharByName,getComicId} = useMarvelService();
    const Name= useParams().name;
    const comicId=useParams().comicId;
    
    useEffect (()=> {
        onCharUpdate();
    },[])

    const onCharUpdate= async()=>{
        if(param==='name'){
            const chars = await getCharByName(Name);
            setData(chars)
        }else if (param==='comicId'){
            console.log(comicId)
            const comics = await getComicId(comicId);
            
            setData(comics)
        }
        
    }

    
    const spinner= loading && !error? <Spinner/> : null;
    const errorM=error ? <ErrorMessage/> : null;
    const viewChar= data && !loading && !error && Name ? <ViewChar data={data}/> :null;
    const viewComic= data && !loading && !error && comicId ? <ViewComic data={data}/> :null;
    return (
        <>
            {spinner}
            {errorM}
            {viewChar}
            {viewComic}
        </>
    )
}

const ViewChar=({data})=>{
    const {title,image,description}= data;
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content={title}
                />
                <title>Marvel information portal</title>
            </Helmet>
            <div className="single-comic">
                <img src={image} alt={title} className="single-comic__img single-comic__img_char "/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    
                </div>
                {/* <a href="#" className="single-comic__back">Back to all</a> */}
            </div>
        </>
        
    )
}


const ViewComic=({data})=>{
    const {title,image,price}= data;
    return(
        <div className="single-comic">
            <img src={image} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            {/* <a href="#" className="single-comic__back">Back to all</a> */}
        </div>
    )
}


export default SingleCharPage;