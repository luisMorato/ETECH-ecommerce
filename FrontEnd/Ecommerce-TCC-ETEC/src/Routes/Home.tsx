import Banner from "../Components/Home/Banner";
import NewArrivals from "../Components/Home/NewArrivals";
import Facilities from "../Components/Home/Facilities";
import Featured from "../Components/Home/Featured";
import NewRelease from "../Components/Home/NewRelease";
import News from "../Components/Home/News";

const Home = () => {

  return (
    <div>
      <Banner />
      <NewArrivals />
      <Facilities />
      <Featured />
      <NewRelease />
      <News />
    </div>
  )
}

export default Home;