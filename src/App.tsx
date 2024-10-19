import React from 'react';
import './App.scss';
import { Routes, Route,useNavigate  } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Test } from './Pages/Test';
import { Result } from './Pages/Result';


function App() {
    const navigate = useNavigate(); 
    return (
        <div className="App">
                  <button className='home_btn' onClick={() => navigate('/')}>&times;</button>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<Test />} />
                <Route path="/result" element={<Result />} />

            </Routes>
        </div>
    );
}

export default App;
