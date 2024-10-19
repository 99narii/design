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
                <Button title='연금술 시작' click={handleNavigation} />
            </footer>
        </div>
    );
};
