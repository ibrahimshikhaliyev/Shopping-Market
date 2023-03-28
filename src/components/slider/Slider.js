import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import firstPhoto from '../../assets/images/img1.png';
import secondPhoto from '../../assets/images/img2.png';
import thirdPhoto from '../../assets/images/img3.png';
import fourthPhoto from '../../assets/images/img4.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import './Slider.scss';

const Slider=({id,images}) => {

    const arrOfImg=[firstPhoto,secondPhoto,thirdPhoto,fourthPhoto];
    let slides;
    
    if(images){
        slides= images.map(item=>{
            return <SwiperSlide>
                <div className="img_displayer"></div>
                <img src={item} alt="" />
            </SwiperSlide>;
        })
    }else{
        slides= arrOfImg.map(item=>{
            return <SwiperSlide>
                <div className="img_displayer"></div>
                <img src={item} alt="" />
            </SwiperSlide>;
        })
    }
    

    

    return (
        <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
            prevEl:`#prev_${id}`,
            nextEl:`#next_${id}`,
            clickable:false
        }}
        loop={true}
        pagination={{
            el :'.pagination_img',
            bulletElement:'div',
            bulletActiveClass:'bullet_img_active',
            clickable: true ,
            renderBullet: function(index,className){
                return `<div class=${className}><div class="bullet_img"><img src=${images?images[index]:arrOfImg[index]} /></div></div> `;
            }
        }}

        >
            {slides}

            <div className="pagination_img">            
            </div>
        </Swiper>
    );
};

export default Slider;