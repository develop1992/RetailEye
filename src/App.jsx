import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
    Login,
    Logout,
    Layout,
    Dashboard,
    Employees,
    Shifts,
    BodyCameras,
    Recordings,
    Incidents,
    PickupShifts
} from './pages';
import RequireRole from './components/RequireRole';

import './App.css'

function App() {
  return (
      <Router>
          <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />

              {/* Protected routes inside layout */}
              <Route element={<Layout />}>
                  <Route
                      path="/"
                      element={
                          <RequireRole role="admin">
                              <Dashboard />
                          </RequireRole>
                      }
                  />
                  <Route
                      path="/employees"
                      element={
                          <RequireRole role="admin">
                              <Employees />
                          </RequireRole>
                      }
                  />
                  <Route
                      path="/shifts"
                      element={
                          <RequireRole role="admin">
                              <Shifts />
                          </RequireRole>
                      }
                  />
                  <Route
                      path="/body-cameras"
                      element={
                          <RequireRole role="admin">
                              <BodyCameras />
                          </RequireRole>
                      }
                  />
                  <Route
                      path="/recordings"
                      element={
                          <RequireRole role="admin">
                              <Recordings />
                          </RequireRole>
                      }
                  />
                  <Route
                      path="/incidents"
                      element={
                          <RequireRole role="admin">
                              <Incidents />
                          </RequireRole>
                      }
                  />
                  <Route
                      path="/pick-up-shifts"
                      element={
                          <RequireRole role="employee">
                              <PickupShifts />
                          </RequireRole>
                      }
                  />
              </Route>
          </Routes>
      </Router>
  )
}

export default App
