import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';

export const Result = () => {
  const location = useLocation();
  const { state } = location;
  const { name } = location.state || {};
  const result = state ? state.result : '결과가 없습니다.';

  // 카드 뒤집기 상태 관리
  const [flipped, setFlipped] = useState(false);

  // 카드 클릭 시 뒤집기
  const handleCardClick = () => {
    setFlipped(!flipped);
    console.log('뒤집힘')
  };

  return (
    <div className='result'>
      <span className='tit'>결과</span>
      <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className='inner'>
          <div className='front'>
            <span className='card_header'>
              <img src='img/s_logo.svg'/>
              <p className='name'>
                {name ? `${name}님` : '이름이 전달되지 않았습니다.'}
              </p>
            </span>
            <h2 className='type'>{result}</h2>
            <div className='type_box'>
            만능 조미료
            </div>
            <img src='img/type/Na.png'/>
            <span className='card_footer'>
              <div>
                <img src='img/Icon.svg'/>
              <p>Na</p>
              </div>
              <p className='tit_ko'>나트륨</p>
            </span>
          </div>
          <div className='back'>
            {/* 여기에 카드 뒷면 내용 추가 */}
            <p>여기에 추가 정보를 넣으세요.</p>
          </div>
        </div>
      </div>
      <div className='info'>
        <img src='img/Icon_Arrow.svg'/>
        <p >카드를 뒤집어 <br/> 자세한 정보를 확인하세요.</p>
      </div>
      {/* <div className='mixture'>
        <p className='tit'>당신의 조합은?</p>
        <div className='mix_card2'>
          <p className='tit'>안정된 상태</p>
        </div>
        <div className='mix_card1'></div>
      </div> */}
      {/* <button onClick={() => window.history.back()}>다시하기</button> */}
    </div>
  );
};
