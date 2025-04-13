import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard, Employees, Shifts, BodyCameras, Recordings, Incidents } from './pages';

import logo from './assets/logo.png'; // adjust path as needed
import './App.css'

function App() {
  return (
      <Router>
          <div className="flex w-full min-h-screen">
              {/* Sidebar */}
              <aside className="w-64 bg-[#6e9b85] text-white p-4 flex flex-col items-center">
                  <Link to="/" className="mb-4">
                      <img src={logo} alt="RetailEye Logo" className="h-40 w-auto" />
                  </Link>
                  <nav className="flex flex-col space-y-4 mb-4 w-full items-center">
                      <Link to="/" className="">Dashboard</Link>
                  </nav>
                  <nav className="flex flex-col space-y-4 mb-4 w-full items-center">
                      <Link to="/employees" className="">Employees</Link>
                  </nav>
                  <nav className="flex flex-col space-y-4 mb-4 w-full items-center">
                      <Link to="/shifts" className="text-left">Shifts</Link>
                  </nav>
                  <nav className="flex flex-col space-y-4 mb-4 w-full items-center">
                      <Link to="/body-cameras" className="text-left">Body Cameras</Link>
                  </nav>
                  <nav className="flex flex-col space-y-4 mb-4 w-full items-center">
                      <Link to="/recordings" className="text-left">Recordings</Link>
                  </nav>
                  <nav className="flex flex-col space-y-4 mb-4 w-full items-center">
                      <Link to="/incidents" className="text-left">Incidents</Link>
                  </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1 bg-[#0a0aa1] p-6 overflow-auto">
                  <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/shifts" element={<Shifts />} />
                      <Route path="/body-cameras" element={<BodyCameras />} />
                      <Route path="/recordings" element={<Recordings />} />
                      <Route path="/incidents" element={<Incidents />} />
                  </Routes>
              </main>
          </div>
      </Router>
  )
}

export default App
