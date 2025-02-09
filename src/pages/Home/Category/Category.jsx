import { Swiper, SwiperSlide } from 'swiper/react'; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules'; 

import slide1 from '../../../assets/home/slide1.jpg'
import slide2 from '../../../assets/home/slide2.jpg'
import slide3 from '../../../assets/home/slide3.jpg'
import slide4 from '../../../assets/home/slide4.jpg'
import slide5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section> 
            <SectionTitle 
            subHeading={'From 11.00am to 10.00pm'} 
            heading={'Order online'}
            ></SectionTitle>

              <Swiper
        slidesPerView={4} 
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-20"
      >
        <SwiperSlide>
            <img src={slide1} alt="slide1" /> 
            <h3 className='text-4xl text-center -mt-16 uppercase text-white'>Salad</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide2} alt="slide1" />
            <h3 className='text-4xl text-center -mt-16 uppercase text-white'>Pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide3} alt="slide1" /> 
            <h3 className='text-4xl text-center -mt-16 uppercase text-white'>Soup</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide4} alt="slide1" /> 
            <h3 className='text-4xl text-center -mt-16 uppercase text-white'>Desserts</h3>
        </SwiperSlide>
        <SwiperSlide>
            <img src={slide5} alt="slide1" /> 
            <h3 className='text-4xl text-center -mt-16 uppercase text-white'>Salad</h3>
        </SwiperSlide> 
      </Swiper>
        </section>
    );
};

export default Category;