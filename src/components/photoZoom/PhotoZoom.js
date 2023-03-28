import { useEffect,useState } from 'react';
import useRequestService from '../service/RequestService';
import './PhotoZoom.scss';
import Spinner from '../spinner/Spinner';
import Slider from '../slider/Slider';

const PhotoZoom=({id})=>{
    const [images,setImages]=useState(null);
    const {getProduct , loading}=useRequestService();

    useEffect(()=>{
        window.addEventListener('click',e=>{
            if(e.target.className==='zoom_podloja' || e.target.className==='closeSlider' ){
                document.querySelectorAll('.zoom').forEach(item=>{
                    item.style.display='none';
                })
            }
        })
    })

    
    useEffect(()=>{
        getProduct(id)
            .then(data=>setImages(data.images));
    },[])

    return(
        <div className="zoom">
            <div className="zoom_podloja" ></div>
            <div className="zoom_slider">
            <div className="slider_container">
                
                <span className='closeSlider'>&#10005;</span>
                <button id="prev_zoom" className='prev controller'><span>&#8249;</span></button>
                <button id="next_zoom" className='next controller'><span>&#8250;</span></button>
                {images && !loading ? <Slider id={'zoom'} images={images}/> : <Spinner/>}
            </div>
            </div>
        </div>
    )
}

export default PhotoZoom;