
const ChefFoodCard = () => {
    return (
        <div>
            <div className="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-center">
      <button className="btn text-red-800 border-b-4 border-red-700">Buy Now</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ChefFoodCard;