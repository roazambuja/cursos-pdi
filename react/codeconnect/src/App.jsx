import "./App.css";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <SearchBar />
    </div>
  );
}

export default App;
