
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover'; 
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => { 
      const [menu] = useMenu()
      const desserts = menu.filter(item => item.category === 'dessert')  
      const soups = menu.filter(item => item.category === 'soup')  
      const salads = menu.filter(item => item.category === 'salad')  
      const pizzas = menu.filter(item => item.category === 'pizza')  
      const offers = menu.filter(item => item.category === 'offered')  

    return (
        <div> 
            <Helmet>
                <title>Bistro Boss | Menu </title>
            </Helmet> 
            {/* Main cover */}
            <Cover img={menuImg} title='Our menu'></Cover>
            <SectionTitle subHeading="Dont't miss" heading="Today's Offer"></SectionTitle>  
            {/* offered menu items */} 
            <MenuCategory items={offers}></MenuCategory>
            {/* Desserts menu items */} 
            <MenuCategory items={desserts} title="Dessert" img={dessertImg}></MenuCategory>
            <MenuCategory items={pizzas} title="Pizza" img={pizzaImg}></MenuCategory>
            <MenuCategory items={salads} title="Salad" img={saladImg}></MenuCategory>
            <MenuCategory items={soups} title="Soup" img={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;