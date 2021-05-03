import React from 'react';
import { useDispatch } from "react-redux";
import { REMOVE_FROM_CART} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";




const CartItem = ({item}) => {
  
    const dispatch = useDispatch();

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item.item._id
        });
        idbPromise('cart', 'delete', { ...item });
    };

    return (
        <div className="flex-row">
            <div className="cart-item-spacing">
                <div className="cart-item-category">{item.item.category}: ${item.item.price}</div>
                <div className="cart-item-details">{item.item.style}, {item.item.color}, {item.item.size}, {item.item.quantity}
                <span
                        role="img"
                        aria-label="trash"
                        onClick={() => removeFromCart(item.item)}
                    >X</span> </div>
               
        
            </div>
        </div>
    );
}

export default CartItem;