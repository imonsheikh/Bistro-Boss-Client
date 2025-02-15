import { useState } from "react";
import orderCover from "../../../assets/shop/order.jpg";
import Cover from "../../Shared/Cover/Cover";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "./../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => { 

    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams() 
    console.log(category); 
    const initialIndex = categories.indexOf(category)

  const [tabIndex, setTabIndex] = useState(initialIndex);
  // console.log(tabIndex);
  const [menu] = useMenu(); 
  

  const desserts = menu.filter((item) => item.category === "dessert");
  const soups = menu.filter((item) => item.category === "soup");
  const salads = menu.filter((item) => item.category === "salad");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <div> 
      <Helmet>
        <title>Bristro Boss | Order Food</title>
      </Helmet>
      <Cover img={orderCover} title="Order Food"></Cover>

      {/* <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}> */}
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
          <Tab>Pizza</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={salads}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizzas}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={soups}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={desserts}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizzas}></OrderTab>
        </TabPanel>
     
      </Tabs>
    </div>
  );
};

export default Order;
