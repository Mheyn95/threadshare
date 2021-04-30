// past designs- order history

import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from "../utils/queries";

function OrderHistory() {

    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    return (
        <div>
            <h2>Order history for {user.firstName} </h2>
            {/* Need to input the rest of the code for objects from order history */}
            {user ? (
                <>
                   
                    {user.orders.map((order) => (
                        <div key={order._id} className="my-2">
                            <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                            <div className="flex-row">
                                {order.products.map(({ _id, image, name, price }, index) => (
                                    <div key={index}>
                                        <Link to={`/products/${_id}`}>
                                            <img
                                                alt={name}
                                                src={`/images/${image}`}
                                            />
                                            <p>{name}</p>
                                        </Link>
                                        <div>
                                            <span>${price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            ) : null}

        </div>
    )
};
export default OrderHistory;
