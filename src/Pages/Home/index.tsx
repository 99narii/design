import React, { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [name, setName] = useState('');
    const [result, setResult] = useState(''); // 결과 상태 추가
    const navigate = useNavigate();

    const handleNavigation = () => {
        // 예시로 결과를 설정 (실제 로직에 맞게 수정 필요)
        const exampleResult = "당신은 매우 창의적인 분자입니다!";
        navigate('/test', { state: { name, result: exampleResult } }); // 입력값과 결과를 state로 전달
    };

    return (
        <div className='main'>
            <img className='logo' src='img/Logo.svg' alt='Logo'/>
            <div className='title'>
                <img className='char' src='img/char.png' />
                <span className='tit'>
                        당신의 성격은<br/>어떤 분자일까요?
                </span>
            </div>
            <div className='card_cont'>
      <input 
        type='text' 
        className='input_name' 
        placeholder='이름' 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      <button 
        type='button' 
        onClick={handleNavigation}
        disabled={!name} // 이름이 비어있으면 버튼 비활성화
      >
        시작
      </button>
            </div>
        </div>
    );
}
