import React from 'react';
import { Button } from '../../Components/Button';
import './style.scss';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/test');
    };

    return (
        <div className='main'>
            <footer className='footer'>
                <button type='button' onClick={handleNavigation}>시작</button>
            </footer>
        </div>
    );
};
