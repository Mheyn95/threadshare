import React, { useState } from "react";
import tshirtImage from '../assets/t-shirt.png'
import sweatshirtImage from '../assets/sweatshirtImage.jpg'
import hoodieImage from '../assets/hoodieImage.jpg'
import jacketImage from '../assets/jacketImage.jpg'

import { useDispatch, useSelector } from "react-redux";

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

import {QUERY_PRODUCT} from "../utils/queries";

function Products() {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [formState, setFormState] = useState({ style: '', color: '', size: '', qty: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const { name, text, qty } = formState;

    let item = [];

    const {
        _id,
        customText,
        style,
        color,
        size,
        quantity,
    } = item;

    const { cart } = state;

    const handleChange = (e) => {
        console.log(e.target);
        
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required.`);
            } else {
                setErrorMessage('');
            }
        
    };

    const addToCart = (e) => {
        e.preventDefault();

        var productStyle = document.getElementById("productStyle").value;
        var productColor = document.getElementById("productColor").value;
        var productSize = document.getElementById("productSize").value;
        var productText = document.getElementById("productColor").value;
        var productQty = document.getElementById("productColor").value;
        
        if (!productStyle && !productColor && !productSize && !productQty){
            
        }else {
            const itemInCart = cart.find((cartItem) => cartItem._id === _id)
            if (itemInCart) {
                dispatch({
                    type: UPDATE_CART_QUANTITY,
                    _id: _id,
                    purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
                });
                idbPromise('cart', 'put', {
                    ...itemInCart,
                    purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
                });
            } else {
                dispatch({
                    type: ADD_TO_CART,
                    product: { ...item, purchaseQuantity: 1 }
                });
                idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
            }
        }
    }

    let product = '';
    let price = 0;
    let image = '';
    switch (window.location.pathname) {
        case '/tShirts':
            product = 'T-Shirt'
            price = 10
            image = tshirtImage
            break;
        case '/sweatshirts':
            product = 'Sweatshirt'
            price = 20
            image = sweatshirtImage
            break;
        case '/hoodies':
            product = 'Hoodies'
            price = 30
            image = hoodieImage
            break;
        case '/jackets':
            product = 'Jackets'
            price = 40
            image = jacketImage
            break;
    }
    return (
        <div className="product-page-container">
            <div>
                <img className="product-img" src={image} alt={product} key={product}/>
            </div>
            <div>
                <h1 className="product-name">{product}</h1>
                <form>
                    <div className="first-product-container">
                        <div className="product-options">
                            <div className="product-options-label">Style</div>
                            {/* Need something for {product}-style */}
                            <select htmlFor='style' className="select-styling" id='productStyle' name='style' onBlur={handleChange}>
                                <option value=""> Select one:</option>
                                <option value="Men's"> Men's</option>
                                <option value="Women's"> Women's</option>
                            </select>
                        </div>
                        
                        <div className="product-options">
                            {/* Need something for {product}-color */}
                            <div className="product-options-label">Color</div>
                            <select className="select-styling" id='productColor' name='color' onBlur={handleChange}>
                                <option value=""> Select one:</option>
                                <option value="Navy"> Navy</option>
                                <option value="Olive Green"> Olive Green</option>
                                <option value="Black"> Black</option>
                                <option value="White"> White</option>
                                <option value="Gray"> Gray</option>
                                <option value="Plum"> Plum</option>
                                <option value="Red"> Red</option>
                            </select>
                        </div>

                        <div className="product-options">
                            {/* Need something for {product}-size */}
                            <div className="product-options-label">Size</div>
                            <select className="select-styling" id='productSize' name='size' onBlur={handleChange}>
                                <option value=""> Select one:</option>
                                <option value="XS"> XS</option>
                                <option value="S"> S</option>
                                <option value="M"> M</option>
                                <option value="L"> L</option>
                                <option value="XL"> XL</option>
                                <option value="XXL"> XXL</option>
                            </select>
                        </div>
                    </div>

                    <div className="second-product-container">
                        <div className="product-options-text-container">
                            <label className="product-options-label" htmlFor="text">Text for Shirt</label>
                            <input className="product-input" id="productText" />
                            {/* <input className="product-input" id="{product}-text" /> */}
                        </div>

                        <div>
                            <label className="product-options-label" htmlFor="qty">Quantity</label>
                            <input className="product-input" type="number" min="0" step="1" id="productQty" name='QTY' onBlur={handleChange}/>
                            {/* need err if number is not positive, or change to a select option, versus text area */}
                            {/* <input className="product-input" id="product-quantity" /> */}
                        </div>

                    </div>

                    {
                        errorMessage ? <div>
                            <p className="error-message">{errorMessage}</p>
                        </div> : null
                    }
                    <div className="third-product-container">
                        <div className="product-price">Price: <span id="product-price">${price}</span></div>

                        

                        <div className="button-row">
                            <button className="btn" type="submit" onClick={addToCart}>Add To Cart</button>
                            {/* <button className="btn" type="submit" onClick={addToCart}>Add To Cart</button> */}
                        
                        {/* Need validation that all fields are filled out */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Products;