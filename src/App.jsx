import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NuovoLavoratore from './pages/NuovoLavoratore';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ListaLavoratori from './pages/ListaLavoratori';
import NuovoEvento from './pages/NuovoEvento';
import ListaEventi from './pages/ListaEventi';

import { useState } from 'react';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <button onClick={() => setSidebarOpen(true)}
        className={`m-4 text-red-700 hover:text-red-500 ${sidebarOpen ? "opacity-0 cursor-not-allowed" : ""}`}
        disabled={sidebarOpen}>

  <i className="fas fa-bars text-2xl"></i>
</button>


          <Routes>
            <Route path="/Home" element={<Home />} />   
            <Route path="/NuovoLavoratore" element={<NuovoLavoratore />} />
            <Route path="/ListaLavoratori" element={<ListaLavoratori />} />
            <Route path="/NuovoEvento" element={<NuovoEvento />} />
            <Route path="/ListaEventi" element={<ListaEventi />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
