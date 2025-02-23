import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import useCart from './../../../hooks/useCart';
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('') 
  const [transactionId, setTransactionId] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const axiosSecure = useAxiosSecure()
  const [cart, refetch] = useCart()
  const {user} = useAuth() 
  const totalPrice = cart.reduce((total, item) => total + item.price,0)

  useEffect(() => {
   if(totalPrice > 0){ //Challenge add it to the readme.md
    axiosSecure.post('/create-payment-intent', {price: totalPrice}) 
    .then(res => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret) 
    }) 
    
   }
  }, [axiosSecure, totalPrice])


  const handleSubmit = async (event) => {
    event.preventDefault(); 

    //Validation 
    if(!stripe || !elements ){
        return 
    } 

    const card = elements.getElement(CardElement) 

    if(card === null){
        return
    } 
    //1.CreatePayment
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card
    }) 

    if(error){
      console.log('payment error', error);
      setError(error.message)
    }else{
      console.log('payment method', paymentMethod);
      setError('')
    } 

    //2.Confirm payment 
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    }) 

    if(confirmError){
      console.log('confirm error', confirmError);
    }else{
      console.log('Payment intent', paymentIntent) 
      if(paymentIntent.status === 'succeeded'){
        console.log('transaction Id', paymentIntent.id) 
        setTransactionId(paymentIntent.id) 

        //Now save the payment in the database 
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), //need to utc(Coordinated Universal Time) date convert: use moment.js 
          cartIds: cart.map(item => item._id),
          menuItemIds: cart.map(item => item.menuId),
          status: 'pending' 
        }
       const res = await axiosSecure.post('/payments', payment)
       console.log('payments saved', res.data); 
       refetch() 
       if(res.data?.paymentResult?.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thank you for the taka paisa😀",
          showConfirmButton: false,
          timer: 1500
        });
       }
        

      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button> 
        <p className="text-red-600">{error}</p> 
        {transactionId && <p className="text-green-600">Your transaction Id: {transactionId}</p>}
      </form>
    </>
  );
};

export default CheckoutForm;
