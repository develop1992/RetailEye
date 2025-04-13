import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home.jsx';
import './App.css'

function App() {
  return (
      <Router>
          <div className="flex h-screen">
              {/* Sidebar */}
              <aside className="w-64 bg-gray-900 text-white p-4">
                  <h1 className="text-xl font-bold mb-6">RetailEye</h1>
                  <nav className="flex flex-col space-y-4">
                      <Link to="/" className="hover:text-blue-400">Dashboard</Link>
                  </nav>
              </aside>

              {/* Main Content */}
              <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                  <Routes>
                      <Route path="/" element={<Home />} />
                  </Routes>
              </main>
          </div>
      </Router>
  )
}

export default App
