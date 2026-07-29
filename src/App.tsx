import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Formations from './pages/Formations';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AppAdmin from './admin/App';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <main>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          
          {/* Route admin avec préfixe */}
          <Route element={<PrivateRoute />}>
          <Route path="/admin/*" element={<AppAdmin />} />
        </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
