import React, { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

export const Intro = () => {
    const navigate = useNavigate();

    return (
        <div className='intro'>
            <img className='logo' src='img/Logo.svg' alt='Logo'/>
            <img className='intro' src='img/intro.png' />

            <span className='tit'>
            당신의 성격을 분자로 표현해보세요!
            </span>
                <button type='button' onClick={() => navigate('/intro')}>시작</button>
        </div>
    );
};
