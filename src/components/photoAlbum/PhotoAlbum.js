import {useState } from 'react';

import PhotoZoom from '../photoZoom/PhotoZoom';
import Slider from '../slider/Slider';
import './PhotoAlbum.scss';



const PhotoAlbum=({images,id})=>{  

    const [prevState,setPrevState]=useState(0);
    const [newState,setNewState]=useState(0);

    const onPhotoZoomOpener=(e)=>{
        
        if(e.target.className==='img_displayer'){
           
            if(newState>prevState){
                document.querySelectorAll('.zoom')[id-1].style.display='block';
            }
            setPrevState(newState);
            setNewState(newState=>newState+1);

        }

    }

    return(
        <>
            <div className="zoom_mobile">
                {newState>prevState?<PhotoZoom id={id}/>:null}
            </div>
            
            <div className="album" onClick={(e)=>onPhotoZoomOpener(e)}>
                <div className="slider_container">
                    <button id={`prev_${id}`} className='prev  controller' ><span>&#8249;</span></button>
                    <button id={`next_${id}`} className='next controller'><span>&#8250;</span></button>
                    <Slider id={id} images={images} />
                </div>
            </div>
        </>
        
    )
}


export default PhotoAlbum;