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
                  <Route path="/" element={<Home />} />
                  <Route path="/Notes/*" element={<Notes />} />
                  <Route path="/TimeTracker" element={<TimeTracker />} />
                  <Route path="/SignupPage" element={<SignupPage />} />
                  <Route path="/Friends" element={<Friends />} />
                  <Route path="/Settings" element={<Settings />} />
                  <Route path="/ProfilePage" element={<ProfilePage />} />
                  <Route path="/CalendarPage" element={<CalendarPage />} />
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
