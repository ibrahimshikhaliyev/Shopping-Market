import CartItem from '../cartItem/CartItem';

import './Cart.scss';
import { useSelector } from 'react-redux';

const Cart=()=>{

    const selected= useSelector(state=>state.selected);

    const cartItems=selected.length!==0 ? selected.map(item=>{
        
        return <CartItem data={item} key={item.id}/>
    }) : <div className='cart_txt'>Cart is Empty</div>;

    const btn=selected.length!==0 ? <button className='checkout_btn'>Checkout</button> : null;

    return(
        <>
            <div className='cart'>
                <div className="cart_header">Cart</div>
                <div className="cart_item_list">
                    {cartItems}
                    {btn}
                </div>
            </div>
            
        </>
        
    )
}

export default Cart;