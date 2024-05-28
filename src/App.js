import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { CustomTagsProvider } from './components/context/CustomTagsContext';
import { TimerProvider } from './components/context/TimerContext';
import { AuthProvider } from './components/context/AuthContext';
import Home from './components/pages/Home/Home';
import Notes from './components/pages/Notes/Notes';
import Friends from './components/pages/Friends/Friends';
import SignupPage from './components/pages/Signup/SignupPage';
import CalendarPage from './components/pages/CalendarPage/CalendarPage';
import Settings from './components/pages/Settings/Settings';
import TimeTracker from './components/pages/TimeTracker/TimeTracker';
import ProfilePage from './components/pages/Profile/ProfilePage';
import LogoutDialog from './components/Dialogs/LogoutDialog';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <ChakraProvider>
      <ColorModeScript />
      <BrowserRouter>
        <CustomTagsProvider>
          <TimerProvider>
            <AuthProvider>
              <div className="App">
                <Routes>
                  <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
                  <Route path="/Notes/*" element={<RequireAuth><Notes /></RequireAuth>} />
                  <Route path="/TimeTracker" element={<RequireAuth><TimeTracker /></RequireAuth>} />
                  <Route path="/Friends" element={<RequireAuth><Friends /></RequireAuth>} />
                  <Route path="/Settings" element={<RequireAuth><Settings /></RequireAuth>} />
                  <Route path="/ProfilePage" element={<RequireAuth><ProfilePage /></RequireAuth>} />
                  <Route path="/CalendarPage" element={<RequireAuth><CalendarPage /></RequireAuth>} />
                  <Route path="/SignupPage" element={<SignupPage />} />
                </Routes>
                <LogoutDialog />
              </div>
            </AuthProvider>
          </TimerProvider>
        </CustomTagsProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
