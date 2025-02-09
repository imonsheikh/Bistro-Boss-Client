import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import ChefFoodCard from '../../Shared/ChefFoodCard/ChefFoodCard';

const ChefFood = () => {
    return (
        <div>
            <SectionTitle 
            subHeading={'Should Try'}
            heading={'Chef Recommends'}
            ></SectionTitle> 
           <div className='flex gap-5 md:flex-row flex-col'>
             <ChefFoodCard></ChefFoodCard>
             <ChefFoodCard></ChefFoodCard>
             <ChefFoodCard></ChefFoodCard>
           </div>

        </div>
    );
};

export default ChefFood;