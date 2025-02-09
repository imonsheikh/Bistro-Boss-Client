import SectionTitle from "../../../components/SectionTitle/SectionTitle";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

//react rating
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="my-20 ">
      <SectionTitle
        subHeading="What Our Client Say"
        heading="Testimonials"
      ></SectionTitle>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}> 

            <div className="my-16 mx-24 flex flex-col items-center">
              <Rating style={{ maxWidth: 180 }} value={review?.rating} readOnly />
              <p className="py-6">{review?.details}</p>
              <h3 className="text-2xl text-orange-400">{review?.name}</h3>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
