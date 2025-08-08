import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-red-900 to-red-800 shadow-2xl z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-6 ">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg">
                <i className="fas fa-user-tie text-xl"></i>
              </div>
              <h2 className="text-white text-2xl font-semibold tracking-wide">FMF Portal</h2>
            </div>
            <button onClick={toggleSidebar} className="mt-1 text-red-200 hover:text-white transition-colors duration-200">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <div className="pt-6 border-t border-red-200"></div>

          {/* Navigation */}
          <nav className="flex-1 p-5 overflow-y-auto">
            <div className="space-y-3">
              {[
                { label: 'Home', icon: 'fa-home', path: '/Home' },
                { label: 'Nuovo Lavoratore', icon: 'fa-user-plus', path: '/NuovoLavoratore' },
                { label: 'Lista Lavoratori', icon: 'fa-users', path: '/ListaLavoratori' },
                { label: 'Nuovo Evento', icon: 'fa-plus', path: '/NuovoEvento' },
                { label: 'Lista Eventi', icon: 'fa-chart-bar', path: '/ListaEventi' }
              ].map(({ label, icon, path }) => (
                <Link key={label} to={path} className="sidebar-item flex items-center p-3 rounded-lg text-white hover:bg-red-700 group transition-all duration-400" onClick={toggleSidebar}>
                  <div className="w-9 h-9 flex items-center justify-center">
                    <i className={`fas ${icon}`}></i>
                  </div>
                  <span className="font-medium text-base">{label}</span>
                  <i className="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
                </Link>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-red-200">
              <h3 className="text-xs uppercase  font-semibold mb-4 tracking-wide px-3">Impostazioni</h3>
              {[
                { label: 'Impostazioni', icon: 'fa-cog', path: '#' },
                { label: 'Logout', icon: 'fa-sign-out-alt', path: '#' }
              ].map(({ label, icon, path }) => (
                <Link key={label} to={path} className="sidebar-item flex items-center p-3 rounded-lg text-white hover:bg-red-700 group transition-all duration-200" onClick={toggleSidebar}>
                  <div className="w-9 h-9 flex items-center justify-center">
                    <i className={`fas ${icon}`}></i>
                  </div>
                  <span className="font-medium text-base">{label}</span>
                  <i className="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-5 border-t border-red-700 bg-red-900/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow">
                <i className="fas fa-user text-lg"></i>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Admin User</p>
                <p className="text-red-300 text-xs">admin@example.com</p>
              </div>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;
