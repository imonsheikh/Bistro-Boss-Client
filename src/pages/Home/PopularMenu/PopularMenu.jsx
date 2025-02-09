import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Menuitem from "../../Shared/MenuItem/Menuitem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => { 

    //========Method 1 =============
    // const [menu, setMenu] = useState([])
    // useEffect(() => {
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     // .then(data => console.log(data))
    //     .then(data => {
    //        const popularItems = data.filter(item => item.category === 'popular')
    //        setMenu(popularItems)
    //     })
    // }, [])  

    //+++++++++++ Method2 ++++++ Using custom hook 
    const [menu] = useMenu() 
    const popular = menu.filter(item => item.category === 'popular')

    return (
        <section className="mb-12"> 
            <SectionTitle 
            heading={'From Our Menu'}
            subHeading={'Popular Items'}
            ></SectionTitle> 

            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular.map(item => <Menuitem 
                    key={item._id} 
                    item={item}
                    ></Menuitem>)
                }
            </div> 
            <button className="btn btn-outline border-b-4 block mx-auto mt-8">View Full Menu</button>
            
        </section>
    );
};

export default PopularMenu;