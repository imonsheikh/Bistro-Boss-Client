// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Cover from "../../Shared/Cover/Cover";
import Menuitem from "../../Shared/MenuItem/Menuitem";

const MenuCategory = ({items, title, img}) => {
    return (
        <div className="pt-8"> 
       
              {title && <Cover img={img} title={title}></Cover>}
             <div className="grid md:grid-cols-2 gap-10 my-16">
                {
                    items.map(item => <Menuitem 
                    key={item._id} 
                    item={item}
                    ></Menuitem>)
                }
            </div> 
        </div>
    );
};

export default MenuCategory;