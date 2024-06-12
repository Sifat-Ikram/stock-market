import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const UpdatePage = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: data = [] } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/data");
      return res.data;
    },
  });

  const selectedItem = data.find((item) => item._id === id);

  if (!selectedItem) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const { date, trade_code, close, low, high, open, volume, _id } =
    selectedItem;

  const onSubmit = async (formData) => {
    const dataInfo = {
      trade_code: formData.trade_code,
      high: parseFloat(formData.high),
      low: parseFloat(formData.low),
      open: parseFloat(formData.open),
      close: parseFloat(formData.close),
      volume: parseInt(formData.volume),
      date: formData.date,
    };

    try {
      const itemRes = await axiosPublic.patch(`/update/${_id}`, dataInfo);

      if (itemRes.data.modifiedCount) {
        Swal.fire("Item updated successfully");
        reset();
        navigate(location?.state ? location.state : "/");
      }
    } catch (error) {
      console.error("There was an error updating the item:", error);
      Swal.fire("There was an error updating the item.");
    }
  };

  return (
    <div className="mt-28 mb-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <div className="text-center mt-20">
          <h1 className="uppercase text-5xl font-bold mt-10">Update Here</h1>
        </div>
        <div className="w-full max-w-4xl mx-auto mt-10">
          <form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-7">
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Trade code
                </label>
                <input
                  {...register("trade_code")}
                  type="text"
                  placeholder="Type trade code here"
                  defaultValue={trade_code}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  How High
                </label>
                <input
                  {...register("high")}
                  type="text"
                  placeholder="high"
                  defaultValue={high}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  How Low
                </label>
                <input
                  {...register("low")}
                  type="text"
                  placeholder="low"
                  defaultValue={low}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Open
                </label>
                <input
                  {...register("open")}
                  type="text"
                  placeholder="Open"
                  defaultValue={open}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Close
                </label>
                <input
                  {...register("close")}
                  type="text"
                  placeholder="close"
                  defaultValue={close}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Volume
                </label>
                <input
                  {...register("volume")}
                  type="text"
                  placeholder="volume"
                  defaultValue={volume}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date
                </label>
                <input
                  {...register("date")}
                  type="date"
                  placeholder="date"
                  defaultValue={date}
                  className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary w-full">
                Item Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
