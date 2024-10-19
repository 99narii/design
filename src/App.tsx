import React from 'react';
import './App.scss';
import { Routes, Route} from 'react-router-dom';
import { Home } from './Pages/Home';
import { Intro } from './Pages/Intro';
import { Test } from './Pages/Test';
import { Result } from './Pages/Result';


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/intro" element={<Home />} />
                <Route path="/test" element={<Test />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </div>
    );
}

export default App;
