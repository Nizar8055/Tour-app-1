import React, {useState, useEffect} from 'react';
import Loading from './Components/Loading';
import Tours from './Components/Tours';
const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
  }

  const fetchTours = async() => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setIsLoading(false);
      setTours(tours);
    } catch(error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect (() => {
    fetchTours();
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>Reload</button>
        </div>
      </main>
    )
  }

  return (
    <>
      <Tours tours = {tours} removeTour={removeTour}/>
    </>
  );
}

export default App;
