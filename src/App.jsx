import { Routes, Route } from 'react-router-dom';
import './reset.css';
import './index.css';
import GridGame from './components/GridGame';

function App() {
  return (
    <>
      <h1>GRID GAME'e hoşgeldiniz</h1>
      <Routes>
        <Route path="/" element={<GridGame className="functional" />} />
      </Routes>
      <footer>
        <p>version 1.0.0</p>
      </footer>
    </>
  );
}

export default App;
