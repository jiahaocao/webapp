
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import ParentPage from './components/pages/parent';
import NavBar from './components/widgets/NavBar';
import About from './components/routes/About';
import Feedback from './components/routes/Feedback';

const App = () => {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<ParentPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </main>
    </div>
    </Router>
  );
};

export default App;
