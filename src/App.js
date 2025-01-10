import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inbox from './pages/Inbox';
import ConversationDetails from './pages/ConversationDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/conversation/:id" element={<ConversationDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;