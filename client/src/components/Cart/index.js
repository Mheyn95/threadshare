import React, { useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/react-hooks';
import { QUERY_CHECKOUT } from '../../utils/queries';
import CartItem from "../CartItem";
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import Auth from "../../utils/auth";
import "./style.css";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const Cart = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);


    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session })
            })
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }
    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.item.quantity * item.item.price;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.item.quantity; i++) {
                productIds.push(item.item._id);
            }
        });

        getCheckout({
            variables: { products: productIds }
        });
    }

    if (!state.cartOpen) {
        return (
            <div className="top-nav-item cart-closed" onClick={toggleCart}>
                    <i className="fa fa-shopping-cart cart-color"></i>
            </div>
        );
    }

    return (
        <div className="cart">
            <div className="cart-header">
                <div className="close" onClick={toggleCart}>X</div>
                <h2>Cart</h2>
            </div>
            
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}

                    <div className="cart-total-container">
                        <strong className="cart-total">Total: ${calculateTotal()}</strong>

                        {Auth.loggedIn() ?
                            <button className="checkout-btn" onClick={submitCheckout}>Checkout</button>
                            :
                            <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ) : (
                <h3 className="nothing-cart">
                Cart is Empty
                </h3>
            )}
        </div>

    );
};

export default Cart;