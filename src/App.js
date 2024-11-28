import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router , Routes } from 'react-router-dom';
import UserRoute from './routes/UserRoute';
function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
              <Route path='/*' element={<UserRoute/>}/>
          </Routes>
        </div>
    </Router>

  );
}

export default App;
