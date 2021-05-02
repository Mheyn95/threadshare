import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { QUERY_ALL_DONATIONS, QUERY_ALL_ORDERS } from "../../utils/queries";
import { ADD_DONATION } from "../../utils/mutations";

// setting up constants for goal tracker
const goal = 1000;
let orderTotal = 0;
let toGoal;
let charityExcuted = false;
let executed = false;

let today = new Date();
today =
  String(today.getMonth() + 1).padStart(2, "0") +
  "/" +
  String(today.getDate()).padStart(2, "0") +
  "/" +
  today.getFullYear();

function Charity() {
  // getting query data needed for goal tracker
  const { loading: donationLoading, data: donationData } = useQuery(
    QUERY_ALL_DONATIONS
  );
  const { loading: orderLoading, data: orderData } = useQuery(QUERY_ALL_ORDERS);
  const [addDonation] = useMutation(ADD_DONATION);
  if (charityExcuted === false) {
    async function addDonationHandler() {
      executed = true;
      console.log("this donation is running");
      const mutationResponse = await addDonation({
        variables: {
          goalHitDate: today,
        },
      });
    }

    if (!donationLoading && !orderLoading) {
      // loop to get total amount spent through orders
      for (let i = 0; i < orderData.orders.length; i++) {
        let products = orderData.orders[i].products;
        for (let j = 0; j < products.length; j++) {
          if (products[j].price === null) {
            products[j].price = 0;
          }
          if (products[j].quantity === null) {
            products[j].quantity = 0;
          }
          orderTotal = orderTotal + products[j].price * products[j].quantity;
        }
      }
      // formula that finds the amount until the next goal
      toGoal = orderTotal - goal * donationData.donations.length;
      const progressBar = (toGoal / goal) * 100;
      document.getElementById("progress").style.width = `${progressBar}%`;
      charityExcuted = true;
    }

    if (toGoal >= goal) {
      addDonationHandler();
      document.location.reload();
    }
  }

  return (
    <div className="charity-container">
      <h2 className="charity-words">
        Giving back is what we're all about. For every $10 you spend, we donate
        $1.
      </h2>

      <div className="charity-counter">
        <div>
          <div id="goal">${goal}</div>
          <div id="goal-bar">
            <div id="progress"></div>
          </div>
        </div>

        <div className="goal-padding">
          <div className="dollars-acc">
            total: <span id="to-goal">${toGoal}</span>
          </div>
          {/* NEEDS TO HAVE A onclick={addtoCart} or redirect to a page where they can fill out amount they want to donate
          <button className="donate-now">Donate now</button> */}
        </div>
      </div>
    </div>
  );
}

export default Charity;
