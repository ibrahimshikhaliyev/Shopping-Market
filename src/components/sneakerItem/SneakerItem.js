import PhotoAlbum from '../photoAlbum/PhotoAlbum';
import SneakerInfo from '../sneakerInfo/SneakerInfo';
import './SneakerItem.scss';


const SneakerItem=({data})=>{
    const {images,id}=data;
    return(
        <div className="sneaker_item">
            <PhotoAlbum images={images} id={id}/>
            <SneakerInfo data={data}/>
        </div>
    )
}

export default SneakerItem;