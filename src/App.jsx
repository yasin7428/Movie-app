import React from 'react';
import Layout from './components/Layout'; // Naya component import kiya
import './App.css'; // Is file ko humne pehle hi khaali kar diya tha

function App() {
  return (
    <div className="app">
      <Layout /> {/* Dekho, ab sirf ek hi component hai! */}
    </div>
  );
}

export default App;