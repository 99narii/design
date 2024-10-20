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
      <div className='card_cont'>
        <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleCardClick}>
          <div className='inner'>
            <div className='front'>
              <span className='card_header'>
                <img src='img/s_logo.svg'/>
                <p className='name'>
                  {name ? `${name}님` : '손님'}
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
      </div>
      <div className='info'>
        <img src='img/Icon_Arrow.svg'/>
        <p >카드를 뒤집어 <br/> 자세한 정보를 확인하세요.</p>
      </div>
      <div className='share'>
        <button type='button'>공유하기</button>
      </div>
      <div className='mixture'>
        <p className='tit'>당신의 조합은?</p>
        <div className='mix_card2'>
          <p className='tit'>안정된 상태</p>
          <div className='name_tag'>
            <span>
              <p className='tit'>Na</p>
              <span>나트륨</span>
            </span>
            <span>
              <p className='tit'>SO2</p>
              <span>이산화황</span>
            </span>
          </div>
        </div>
        <div className='mix_card'>
        <p className='tit'>격렬한 반응</p>
        </div>
      </div>
      <img className='char' src='img/char.png' />
      <div className='cont'>
        <div className='best'>
          <p>나와 잘 맞는 분자는?</p>
          <span>Ne</span>
          <div>
            <p>(Na) vs. (Ne)</p>
나트륨(Na)은 반응성이 매우 큰 금속으로,
결합하려는 경향이 강해요. 반면 네온(Ne)은
비활성 기체로 반응을 거의 하지 않기 때문에,
나트륨이 혼자서 불안정한 상태가 돼요.
최외곽 전자가 하나 남아 결합을 원하지만, 네온이
반응하지 않으니 나트륨이 극도로 불안정해져요.
          </div>
        </div>
        <div className='worst'>
          <p>나와 맞지 않는 분자는?</p>
          <span>Ne</span>
          <div>
            <p>(Na) vs. (SO₂)
            </p>
            나트륨(Na)과 이산화황(SO₂)는 적절한 환경에서
안정적인 결합을 형성해요. 나트륨이 최외곽
전자를 잃고, 이산화황이 이 전자를 받아들이면서
서로 결합해 안정된 화합물을 형성해요.

          </div>

        </div>
      </div>
      {/* <button onClick={() => window.history.back()}>다시하기</button> */}
    </div>
  );
};
