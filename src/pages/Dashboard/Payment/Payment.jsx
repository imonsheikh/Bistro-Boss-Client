import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
import SSLPayment from "./SSLPayment";

//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {  
     const [method, setMethod] = useState('stripe')

    return (
        <div>
            <SectionTitle
            heading={'Payment'}
            subHeading={'Please pay to eat'}
            ></SectionTitle> 
            
            <select 
            onChange={(e) => setMethod(e.target.value)}  
            className="select font-bold text-lg mb-5"
            name="" id="">
                <option value="stripe">Stripe</option>
                <option value="SSLCommerce">SSL Commerz</option>
            </select> 

            {
                method === 'stripe' ?  <div> 
                <Elements stripe={stripePromise}>
                  <CheckoutForm></CheckoutForm>
                </Elements>
            </div> :  
            <SSLPayment></SSLPayment>
            }

           
        </div>
    );
};

export default Payment;