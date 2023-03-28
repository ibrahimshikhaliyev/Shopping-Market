import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SneakerItem from '../sneakerItem/SneakerItem';
import useRequestService from '../service/RequestService';
import Spinner from '../spinner/Spinner';
import {cartItemsFetched} from '../cartItem/cartItemSlice';
import '../sneakerList/SneakerList.scss';


const SneakerList=({category_id})=>{
    const {loading,getAllProducts} = useRequestService();
    const cartItems = useSelector(state=>state.cartItems);
    const dispatch= useDispatch();

    useEffect(e=>{
        onUpdateAllProducts();
    },[])

    const onUpdateAllProducts=()=>{
        getAllProducts()
            .then(data=>{
                dispatch(cartItemsFetched(data))
            });
    }
    const items= loading ? <Spinner/>: cartItems.map(item=>{
        if(item.category_id===category_id){
            return(
                <SneakerItem data={item} key={item.id}/>
            )
        }
        return null;
    })

    return(
        <div className="sneaker_list">
            {items}
        </div>
    )
}

export default SneakerList;