import SearchBar from './components/SearchBar/SearchBar';
import WeatherForeCast from './components/WeatherForecast/WeatherForeCast';
import './App.css';
import './styles/partials/_global.scss'

function App() {

  const handleOnSearchChange = (searchData) => {
    console.log(searchData)
  }

  return (
    <div className='app'>
      <SearchBar onSearchChange={handleOnSearchChange} />
      <WeatherForeCast />
    </div>
  );
}

export default App;
