import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewGame from "./components/NewGame";

const App: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="text-primary text-center">SpaceTraders</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<NewGame />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
