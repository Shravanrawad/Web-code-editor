import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Playprovider from './providers/playprovider';
import Playground from './pages/playground/playground';
import Modalprovider from './providers/modalprovider';

function App() {
  return (
    
    <Playprovider>
      <Modalprovider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/playground/:fileId/:folderId' element={<Playground />} />
          </Routes>
        </BrowserRouter>
      </Modalprovider>
    </Playprovider>

  );
}

export default App;

