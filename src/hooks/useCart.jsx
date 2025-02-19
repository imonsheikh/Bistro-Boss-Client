import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => { 
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth() 

  //tanstack query
  const {refetch,  data: cart = [] } = useQuery({
   queryKey: ['cart', user?.email], //it's important. it's catching data 
   queryFn: async () => {
    const res = await axiosSecure.get(`/carts?email=${user?.email}`) 
    return res.data
   }
  }); 

  return [cart, refetch]
};

export default useCart;

/**
 * api, axios(axios secure), tanstack 
 */