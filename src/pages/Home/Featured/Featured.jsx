import SectionTitle from "../../../components/SectionTitle/SectionTitle"; 
import './Featured.css'

import featuredImg from '../../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <div className="featured-item text-white pt-8 my-20 bg-fixed ">
            <SectionTitle 
            subHeading={'Check it Out'}
            heading={'Featured Items'}
            ></SectionTitle> 

            <div className="md:flex justify-center items-center pb-20 pt-12 px-36 bg-black/50">
                <div>
                    <img src={featuredImg} alt="featuredImg" />
                </div> 
                <div className="md:ml-10 space-y-3">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase font-bold">Where can I get some?</p> 
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum tempore odio, reiciendis, pariatur laboriosam vel quas, sunt accusamus cum perferendis quidem. Natus sint ducimus error veritatis itaque exercitationem suscipit ratione.</p>  

                    <button className="btn btn-outline border-b-4">Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;