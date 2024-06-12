import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ItemsInfo = () => {
  const axiosPublic = useAxiosPublic();

  const { data: data = [], refetch } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/data");
      return res.data;
    },
  });

  const handleDelete = (data) => {
    Swal.fire({
      title: "Are you really want to delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/data/${data._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "item Deleted!",
              text: "Item has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 mt-28">
      <h1 className="text-4xl font-bold text-center mb-8">Trade Information</h1>
      <div className="grid gap-5 lg:gap-5 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.slice(0, 20).map((item) => (
          <div
            key={item._id}
            className="card cursor-pointer bg-white shadow-lg border-2 hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
          >
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Trade Details
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Date:</strong> {item.date}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Trade Code:</strong> {item.trade_code}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>High:</strong> {item.high}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Low:</strong> {item.low}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Open:</strong> {item.open}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Close:</strong> {item.close}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Volume:</strong> {item.volume}
                </p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex items-center justify-center w-full py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
                  <Link
                    to={`/updatePage/${item._id}`}
                    className="flex justify-center items-center"
                  >
                    <FaEdit className="mr-2" />
                    <span>Edit</span>
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="flex items-center justify-center w-full py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
                >
                  <FaTrash className="mr-2" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsInfo;
