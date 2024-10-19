import React from 'react';
import './style.scss'; // 필요에 따라 스타일을 가져옵니다.

const Card = ({ flipped, handleCardClick, name, result, mbtiInfo }) => {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className='inner'>
        <div className='front'>
          <span className='card_header'>
            <img src='img/s_logo.svg' alt='Logo' />
            <p className='name'>
              {name ? `${name}님` : '이름이 전달되지 않았습니다.'}
            </p>
          </span>
          <h2 className='type'>{result}</h2>
          <div className='type_box'>
            {mbtiInfo.alias} {/* 별칭 */}
          </div>
          <img src={`img/type/${mbtiInfo.title}.png`} alt={mbtiInfo.tit_ko} />
          <span className='card_footer'>
            <div>
              <img src='img/Icon.svg' alt='Element Icon' />
              <p>{mbtiInfo.title}</p> {/* 원소 기호 */}
            </div>
            <p className='tit_ko'>{mbtiInfo.tit_ko}</p> {/* 원소 한글 이름 */}
          </span>
        </div>
        <div className='back'>
          <h3>{mbtiInfo.alias}</h3> {/* 별칭 */}
          <p>{mbtiInfo.description}</p> {/* 설명 */}
          <p>{mbtiInfo.field}</p> {/* 실생활 분야 */}
          <p>{mbtiInfo.info}</p> {/* 추가 정보 */}
        </div>
      </div>
    </div>
  );
};

export default Card;
