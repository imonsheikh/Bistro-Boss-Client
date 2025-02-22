import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic"; 


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY 
const image_hosting_api= `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdataItem = () => { 
    const {name, category, recipe, price, _id} = useLoaderData() 
      const { register, handleSubmit, reset } = useForm(); 
      const axiosSecure = useAxiosSecure()
      const axiosPublic = useAxiosPublic()
    // console.log(item); 

      const onSubmit = async (data) => {
        console.log(data);
    
        //image upload to imgbb and then get an url 
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.data.success){
            //Now send the menu item data to the server with the image 
            const menuITem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            } 
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuITem) 
            console.log(menuRes.data); 
            if(menuRes.data.modifiedCount > 0){
                //show success
                // reset() 
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${data.name} is updated to the menu`,
                  showConfirmButton: false,
                  timer: 1500
                });
            }
        } 
        console.log('with image url ', res.data); 
      };
    
    
    return (
        <div>
            <SectionTitle
            heading={"Update Item"} 
            subHeading={"Refresh info"}
            ></SectionTitle> 
               <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">Recipe Name</legend>
                        <input 
                          defaultValue={name}
                          {...register("name", { required: true })}
                          //   required
                          type="text"
                          className="input w-full"
                          placeholder="Recipe Name"
                        />
                      </fieldset>
                      <div className="flex items-center justify-between gap-6">
                        {/* Category  */}
                        <div className="w-full">
                          <legend className="fieldset-legend text-xs">Category</legend>
                          <select
                            {...register("category", { required: true })}
                            className="select select-bordered w-full "
                            defaultValue={category}
                          >
                            <option disabled value="">
                              Selected a category
                            </option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                          </select>
                        </div>
                        {/* Price  */}
                        <div className="w-full">
                          <fieldset className="fieldset">
                            <legend className="fieldset-legend">Price</legend>
                            <input 
                              defaultValue={price}
                              {...register("price", { required: true })}
                              type="text"
                              className="input w-full"
                              placeholder="Price"
                            />
                          </fieldset>
                        </div>
                      </div>
                      {/* Recipe Details */}
                      <fieldset className="fieldset mb-3">
                        <legend className="fieldset-legend">Recipe Details</legend>
                        <textarea 
                          defaultValue={recipe}
                          {...register("recipe")}
                          className="textarea h-24"
                          placeholder="Bio"
                        ></textarea>
                      </fieldset>
                      <div className="mb-3">
                        <input
                          {...register("image", { required: true })}
                          type="file"
                          className="file-input"
                        />
                      </div>
                      <button 
                      type="submit"
                      className="btn">
                        Update Menu Item
                        {/* <FaUtensils></FaUtensils> */}
                      </button>
                    </form>
                  </div>
        </div>
    );
};

export default UpdataItem;