import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import { CustomTagsProvider } from './components/context/CustomTagsContext';

import Home from './components/pages/Home/Home';
import Notes from './components/pages/Notes/Notes';
import NotePage from './components/pages/Notes/NotePage';
import Friends from './components/pages/Friends/Friends';
import Signup from './components/pages/signup/Signup';
import Settings from './components/pages/Settings/Settings';
import TimeTracker from './components/pages/TimeTracker/TimeTracker';

function App() {
  return (
    <ChakraProvider>
      <ColorModeScript />
      <BrowserRouter>
        <CustomTagsProvider> 
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Notes/*" element={<Notes />} />
              <Route path="/notepage" element={<NotePage />} />
              <Route path="/TimeTracker" element={<TimeTracker />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Friends" element={<Friends />} />
              <Route path="/Settings" element={<Settings />} />
            </Routes>
          </div>
        </CustomTagsProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
