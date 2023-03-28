import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import basketIcon from '../../assets/icons/white_basket.png';
import './SneakerInfo.scss';
import {selectedUpdate,selectedFethced} from '../cartItem/cartItemSlice';


const SpeakerInfo=({data})=>{
    const [counter,setCounter] =useState(0);
    const [discount,setDiscount] =useState(50);



    const selected= useSelector(state=>state.selected);
    const dispatch= useDispatch();
    const {price,title,name,id,description,images}=data;
    

    const onCheckUpdateSelected=()=>{
        if(counter){
            if(selected.length!==0){
                const itemCheck=selected.filter(item=>{
                    return item.id===id;
                })
                if(itemCheck.length!==0){
                    dispatch(selectedUpdate({counter,id}))
                    
                }else{
                    dispatch(selectedFethced({title,price,counter,id,images}))
                }
            }else{
                dispatch(selectedFethced({title,price,counter,id,images}))
            }

          
        }
       
    }

    

    return(
        <div className="info">
            <span className='info_title'>{name}</span>
            <div className="info_sneaker_title">{title}</div>
            <div className="info_descr">
                 {description}
            </div>
            <div className="price">
                <div className="price_current">${(price*discount/100)}</div>
                <div className="price_discount">{discount}%</div>
                <div className="price_old">${price}</div>
            </div>
            <div className="adding">
                <div className="counter">
                    <button className="counter_operator" onClick={e=>{
                        if(counter>0){
                            setCounter(counter=>counter-1);
                        }   
                    }}><span>&#8722;</span></button>
                    <div className="counter_number">{counter}</div>
                    <button className="counter_operator" onClick={e=>{
                        setCounter(counter=>counter+1);
                    }}><span>&#43;</span></button>
                </div>
                <button className="adding_button"
                        onClick={()=>onCheckUpdateSelected()}
                >
                    <div className="basket_icon">
                        <img src={basketIcon} alt="basket icon" />

                    </div>

                    <span>Add to card</span>
                </button>
            </div>
        </div>
    )
}

export default SpeakerInfo;