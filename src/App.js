import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import './styles/partials/_global.scss'

function App() {

  const handleOnSearchChange = (searchData) => {
    console.log(searchData)
  }

  return (
    <div className='app'>
      <SearchBar onSearchChange={handleOnSearchChange} />
    </div>
  );
}

export default App;
