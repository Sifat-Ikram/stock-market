import ChartComponent from "../utils/ChartComponent";
import ItemsInfo from "../utils/ItemsInfo";


const HomePage = () => {
  

  return (
    <div className="container mx-auto p-4 mt-20">
        <div className="my-10 w-3/4 mx-auto">
            <ChartComponent />
        </div>
      <ItemsInfo />
    </div>
  );
};

export default HomePage;
