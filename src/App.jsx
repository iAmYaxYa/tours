import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Tours from "./components/Tours";

const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const removeTour = (id) => {
    let newTour = data.filter((tour) => tour.id !== id);
    setData(newTour);
  };
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (data.length === 0) {
    return (
      <main>
        <div className="title">
          <h4>no tours left</h4>{" "}
          <button className="btn" onClick={() => getData()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={data} removeTour={removeTour} />
    </main>
  );
};
export default App;
