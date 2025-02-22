// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => { 
    /**NORMAL useEffect and fetch */
    //  const [menu, setMenu] = useState([]) 
    //  const [loading, setLoading] = useState(true)
    
    //     useEffect(() => {
    //         // fetch('menu.json') //data load from server
    //         fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         // .then(data => console.log(data))
    //         .then(data => {
    //            setMenu(data) 
    //            setLoading(false)
    //         })
    //     }, [])

    /**Tanstack query */  
    const axiosPublic = useAxiosPublic()
    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'], 
        queryFn: async () => {
           const res = await axiosPublic.get('/menu')
           return res.data
        }
    }) 
    
    return [menu, loading, refetch]
};

export default useMenu; 