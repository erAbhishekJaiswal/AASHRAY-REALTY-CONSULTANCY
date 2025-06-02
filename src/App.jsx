import Property from './pages/Property'

// function App() {
//   return(
//     <div className="App">
//      <Property />
//     </div>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyForm from './components/PropertyForm';
import PropertyDetail from './components/PropertyDetail';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='app-container' >
        <Routes>
          <Route path="/oldpage" element={<Property />} />
          <Route path='/' element={<PropertyList />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/new" element={<PropertyForm />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/properties/edit/:id" element={<PropertyForm isEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;