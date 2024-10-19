import React from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';

export const Result = () => {
  const location = useLocation();
  const { state } = location;
  const result = state ? state.result : '결과가 없습니다.'; // 기본값 설정
  
  return (
    <div className='result'>
      <h1>결과</h1>
      <h2>{result}</h2>
      <button onClick={() => window.history.back()}>다시하기</button>
    </div>
  );
};
