import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"], //catching data like id format
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch() 
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now`,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            //Refetch the data for update
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h1>All Users</h1>
        <h1>Total Users: {users.length}</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}> 
                  <th>{index + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        title="Make "
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-lg bg-orange-500"
                      >
                        <FaUsers className="text-white text-2xl "></FaUsers>
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      title="Delete"
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
