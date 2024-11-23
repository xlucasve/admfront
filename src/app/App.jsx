import React from 'react'
import { GlobalProvider } from '../context/global/globalContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MyClaims, AllClaims, MyArbitrations, AllArbitrations } from './screens/Case/CaseTypes'
import { Logs } from './screens/LogsEvents/Logs'
import { AccessControl } from './screens/AccessControl/AccessControl'
import Dashboard from './screens/Dashboard/Dashboard'
import { ModalProvider } from '../context/ModalProvider'
import Profile from './screens/Profile/Profile'
import Login from './screens/Login/Login'
import { ColorModeContext, useMode } from '../styles/theme'
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../layouts/ProtectedRoute';
import { AuthProvider } from '../context/AuthProvider'
import { AlertProvider } from '../context/AlertProvider'
import { NotFound } from './screens/Error/NotFound'

function App() {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
      <AuthProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalProvider>

              <ModalProvider>
                <AlertProvider>
                  <Routes>

                    <Route path='/auth' element={<AuthLayout />}>

                      <Route index element={<Login />} />

                    </Route>

                    <Route path="/" element={<ProtectedRoute />}>

                      <Route index element={<Dashboard />} />

                      <Route path="/my-claims" element={<MyClaims />} />

                      <Route path="/all-claims" element={<AllClaims />} />

                      <Route path="/my-arbitrations" element={<MyArbitrations />} />

                      <Route path="/all-arbitrations" element={<AllArbitrations />} />

                      <Route path="/logs" element={<Logs />} />

                      <Route path="/access-control" element={<AccessControl />} />

                      <Route path="/profile" element={<Profile />} />

                      <Route path="*" element={<NotFound />} />

                    </Route>



                  </Routes>
                </AlertProvider>
              </ModalProvider>

            </GlobalProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App;
