import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style.scss';

// MBTI 데이터 타입 정의
interface MBTIData {
    title: string;
    tit_ko: string;
    alias: string;
    description: string;
    field: string;
    info: string;
    best: string;
    best_ko: string;
    best_comment: string;
    worst: string;
    worst_ko: string;
    worst_comment: string;
}

// 데이터셋 타입 정의
type DataSet = {
    [key: string]: MBTIData;
};

// 데이터셋 정의
const dataSet: DataSet = {
  ISTJ: {
    title: "Na",
    tit_ko: "나트륨",
    alias: "만능 조미료",
    description: "나트륨(Na)은 염소(Cl₂)와 결합해 우리가 일상에서 사용하는 소금을 만들어내는 필수 원소예요. 당신의 조직적이고 실용적인 성격은 나트륨처럼 언제나 제자리를 지키며 중요한 역할을 수행하는 특성과 닮아 있어요.",
    field: "식품",
    info: "나트륨은 소금(NaCl)으로 가장 잘 알려져 있어요. 일상에서 조미료로 사용되며, 체내의 전해질 균형을 맞추는 데 중요한 역할을 해요.",
    best: "SO₂",
    best_ko: "이산화황",
    best_comment: "나트륨(Na)과 이산화황(SO₂)는 적절한 환경에서 안정적인 결합을 형성해요. 나트륨이 최외곽 전자를 잃고, 이산화황이 이 전자를 받아들이면서 서로 결합해 안정된 화합물을 형성해요.",
    worst: "Ne",
    worst_ko: "네온",
    worst_comment: "나트륨(Na)은 반응성이 매우 크지만, 네온(Ne)은 비활성 기체로 반응하지 않아요. 나트륨은 결합하려 하나 네온이 반응하지 않아 극도로 불안정한 상태가 돼요."
},

ISFJ: {
    title: "H₂",
    tit_ko: "수소",
    alias: "만물의 영장",
    description: "수소(H₂)는 우주에서 가장 풍부한 원소로, 생명체와 물의 구성 요소로서 매우 중요한 역할을 해요. 당신의 따뜻하고 보호적인 성격은 수소처럼 모든 존재의 기반을 이루는 안정감과 닮아 있어요.",
    field: "에너지 및 우주 기술",
    info: "수소(H₂)는 연료전지에서 사용되며, 자동차나 전기 생산에 중요한 역할을 해요. 또한 우주선 연료로도 활용돼요.",
    best: "H₂O",
    best_ko: "물",
    best_comment: "수소(H₂)와 물(H₂O)는 자연 상태에서 큰 반응 없이 안정적으로 공존해요. 수소는 물의 일부로 존재하며, 더 이상 산화되지 않아 안정된 상태를 유지해요.",
    worst: "NO",
    worst_ko: "일산화질소",
    worst_comment: "수소(H₂)와 일산화질소(NO)는 만나면 강력한 반응을 일으켜 폭발적인 에너지를 방출하며 폭발할 수 있어요."
},

INFJ: {
    title: "N₂",
    tit_ko: "질소",
    alias: "고요한 철학자",
    description: "질소(N₂)는 공기의 약 78%를 차지하지만 반응성이 낮아 조용히 존재해요. 당신의 깊은 사고와 통찰력은 질소처럼 눈에 띄지 않지만 중요한 역할을 하고 있어요.",
    field: "농업 및 산업",
    info: "질소(N₂)는 비료 제조에 중요한 원료예요. 또한 산업 공정에서 냉각제로 사용되기도 해요.",
    best: "Ne",
    best_ko: "네온",
    best_comment: "질소(N₂)와 네온(Ne)은 반응성이 거의 없어 평화롭게 공존해요.",
    worst: "H₂O",
    worst_ko: "물",
    worst_comment: "질소(N₂)는 물과 고온에서 강렬한 반응을 일으켜 폭발적인 에너지를 방출할 수 있어요."
},

INTJ: {
    title: "F₂",
    tit_ko: "플루오린",
    alias: "강력한 전략가",
    description: "플루오린(F₂)은 매우 반응성이 강해, 거의 모든 물질과 강한 결합을 형성해요. 당신의 전략적이고 분석적인 성향은 플루오린처럼 주변 환경에 강한 영향을 미치고, 철저하게 계획을 세워 큰 변화를 이끌어내요.",
    field: "치과 및 산업",
    info: "플루오린은 치약과 산업에 사용돼요.",
    best: "NO",
    best_ko: "일산화질소",
    best_comment: "플루오린(F₂)과 일산화질소(NO)는 서로 강하게 결합해 안정적인 화합물을 형성해요.",
    worst: "SO₂",
    worst_ko: "이산화황",
    worst_comment: "플루오린(F₂)과 이산화황(SO₂)이 만나면 매우 격렬한 산화반응을 일으켜 폭발할 수 있어요."
},

ISTP: {
    title: "Mg",
    tit_ko: "마그네슘",
    alias: "즉각적인 해결사",
    description: "마그네슘(Mg)은 빠르게 반응하며 다양한 환경에서 실용적으로 사용돼요. 당신의 즉각적인 문제 해결 능력과 실용적인 성격은 마그네슘이 다양한 화합물에서 중요한 역할을 하는 것과 유사해요.",
    field: "건강 및 건축",
    info: "마그네슘은 보충제와 합금으로 사용돼요.",
    best: "Al",
    best_ko: "알루미늄",
    best_comment: "마그네슘(Mg)과 알루미늄(Al)은 금속 간의 안정적인 결합을 형성할 수 있어요.",
    worst: "NH₃",
    worst_ko: "암모니아",
    worst_comment: "마그네슘(Mg)과 암모니아(NH₃)가 만나면 폭발적인 화학 반응을 일으킬 수 있어요."
},

ISFP: {
    title: "C",
    tit_ko: "탄소",
    alias: "다양성의 예술가",
    description: "탄소(C)는 생명체의 주요 구성 요소로, 다양한 화합물을 형성할 수 있는 유연성을 가지고 있어요. 당신의 창의적이고 유연한 성격은 탄소처럼 다양한 상황에 적응하고 변화를 만들어내는 능력과 잘 맞아요.",
    field: "모든 생명체 및 산업",
    info: "탄소는 생명체의 주요 구성 요소로, 다이아몬드와 흑연에 포함돼요.",
    best: "NH₃",
    best_ko: "암모니아",
    best_comment: "탄소(C)와 암모니아(NH₃)는 큰 반응 없이 공존할 수 있어요.",
    worst: "Fe",
    worst_ko: "철",
    worst_comment: "탄소(C)와 철(Fe)은 고온에서 불안정한 합금을 형성하며 강한 반응을 일으킬 수 있어요."
},

INFP: {
    title: "O₂",
    tit_ko: "산소",
    alias: "이상주의자",
    description: "산소(O₂)는 생명 유지에 필수적인 원소로, 항상 주변에서 생명력을 유지시켜요. 당신의 이상주의적 성향과 깊은 내면의 열정은 산소처럼 조용하지만 강력한 영향력을 발휘해요.",
    field: "의료 및 산업",
    info: "산소는 산소 치료와 금속 연소에 사용돼요.",
    best: "NH₃",
    best_ko: "암모니아",
    best_comment: "산소(O₂)와 암모니아(NH₃)는 적절한 조건에서 안정적인 화합물을 형성해요.",
    worst: "Al",
    worst_ko: "알루미늄",
    worst_comment: "산소(O₂)와 알루미늄(Al)이 만나면 격렬한 산화 반응을 일으켜 폭발할 수 있어요."
},

INTP: {
    title: "Li",
    tit_ko: "리튬",
    alias: "논리적 혁신가",
    description: "리튬(Li)은 높은 반응성을 가지고 있으며, 현대 기술에서 중요한 역할을 해요. 당신의 논리적 사고와 혁신적인 아이디어는 리튬이 다양한 기술에서 핵심적인 역할을 하는 것과 유사해요.",
    field: "배터리 및 전자기기",
    info: "리튬은 리튬 이온 배터리의 핵심 재료예요.",
    best: "Fe",
    best_ko: "철",
    best_comment: "리튬(Li)과 철(Fe)은 서로 안정적인 금속 화합물을 형성해요.",
    worst: "CaCO₃",
    worst_ko: "탄산칼슘",
    worst_comment: "리튬(Li)과 탄산칼슘(CaCO₃)이 만나면 강력한 화학 반응을 일으켜 폭발할 수 있어요."
},

ESTP: {
    title: "H₂O",
    tit_ko: "물",
    alias: "자유로운 행동가",
    description: "물(H₂O)은 다양한 환경에서 즉각적으로 적응하고, 생명에 필수적이에요. 당신의 변화무쌍하고 실용적인 성격은 물처럼 상황에 맞춰 실용적으로 행동해요.",
    field: "전반적인 생활",
    info: "물은 마시는 것, 청소, 농업에 사용돼요.",
    best: "H₂",
    best_ko: "수소",
    best_comment: "수소(H₂)와 물(H₂O)는 자연 상태에서 안정적으로 공존해요.",
    worst: "N₂",
    worst_ko: "질소",
    worst_comment: "물(H₂O)과 질소(N₂)는 고온에서 강한 반응을 일으켜 폭발할 수 있어요."
},

ESFP: {
    title: "SO₂",
    tit_ko: "이산화황",
    alias: "열정적인 연기자",
    description: "이산화황(SO₂)은 강한 냄새와 반응성을 가지고 있으며, 환경에 큰 영향을 미칠 수 있어요. 당신의 활기차고 즉흥적인 성격은 이산화황처럼 눈에 띄는 방식으로 세상에 영향을 줘요.",
    field: "식품 및 환경",
    info: "이산화황은 방부제와 오염물질 관리에 사용돼요.",
    best: "Na",
    best_ko: "나트륨",
    best_comment: "나트륨(Na)과 이산화황(SO₂)는 적절한 환경에서 안정적인 결합을 형성해요.",
    worst: "F₂",
    worst_ko: "플루오린",
    worst_comment: "이산화황(SO₂)과 플루오린(F₂)이 만나면 매우 격렬한 반응을 일으켜 폭발할 수 있어요."
},

ENFP: {
    title: "Ne",
    tit_ko: "네온",
    alias: "빛나는 상상가",
    description: "네온(Ne)은 비활성 기체로, 화학적으로는 반응하지 않지만 그 자체로 빛을 발하며 존재감을 드러내요. 당신의 창의적이고 다재다능한 성격은 네온처럼 자유롭고 상상력이 넘쳐요.",
    field: "광고 및 조명",
    info: "네온은 네온사인에 사용돼요.",
    best: "N₂",
    best_ko: "질소",
    best_comment: "네온(Ne)과 질소(N₂)는 반응성이 거의 없어 서로 반응하지 않고 안정적으로 존재해요.",
    worst: "Na",
    worst_ko: "나트륨",
    worst_comment: "네온(Ne)은 반응하지 않아 나트륨(Na)이 불안정해져요. 나트륨은 결합을 원하지만 네온은 이에 반응하지 않아요."
},

ENTP: {
    title: "NO",
    tit_ko: "일산화질소",
    alias: "창의적 발명가",
    description: "일산화질소(NO)는 반응성이 강하며, 다양한 화학 반응을 촉진하는 역할을 해요. 당신의 논리적이면서도 창의적인 성향은 다양한 아이디어를 통해 변화를 이끌어내요.",
    field: "의료 및 환경",
    info: "일산화질소는 심혈관 치료와 오염 모니터링에 사용돼요.",
    best: "F₂",
    best_ko: "플루오린",
    best_comment: "플루오린(F₂)과 일산화질소(NO)는 서로 강하게 결합해 안정적인 화합물을 형성해요.",
    worst: "H₂",
    worst_ko: "수소",
    worst_comment: "일산화질소(NO)와 수소(H₂)는 강력한 반응을 일으켜 폭발할 수 있어요."
},

ESTJ: {
    title: "Al",
    tit_ko: "알루미늄",
    alias: "철저한 관리자",
    description: "알루미늄(Al)은 강한 내구성을 가지고 있으며, 다양한 산업에서 중요한 역할을 해요. 당신의 조직적이고 실용적인 성격은 알루미늄처럼 강력하고 신뢰할 수 있는 존재예요.",
    field: "포장재 및 건축",
    info: "알루미늄은 캔, 항공기, 차량에 사용돼요.",
    best: "Mg",
    best_ko: "마그네슘",
    best_comment: "알루미늄(Al)과 마그네슘(Mg)은 안정적인 금속 결합을 형성해요.",
    worst: "O₂",
    worst_ko: "산소",
    worst_comment: "알루미늄(Al)과 산소(O₂)는 강력한 산화 반응을 일으켜 폭발할 수 있어요."
},

ESFJ: {
    title: "CaCO₃",
    tit_ko: "탄산칼슘",
    alias: "사회적 돌봄자",
    description: "탄산칼슘(CaCO₃)은 안정적인 화합물로, 주변 환경을 보호하고 완충 역할을 해요. 당신의 타인을 돌보는 성향과 보호적인 성격은 탄산칼슘처럼 사람들에게 안정감을 줘요.",
    field: "건축 및 의약품",
    info: "탄산칼슘은 건축 자재와 제산제에 사용돼요.",
    best: "Fe",
    best_ko: "철",
    best_comment: "리튬(Li)과 철(Fe)은 서로 안정적인 금속 화합물을 형성해요. 리튬이 전자를 잃고 철과 결합하면서 안정적인 결합 구조를 형성해, 지속 가능한 상호작용을 유지해요.",
    worst: "Li",
    worst_ko: "리튬",
    worst_comment: "리튬(Li)과 탄산칼슘(CaCO₃)이 만나면 격렬한 화학 반응을 일으켜 폭발할 수 있어요."
},

ENFJ: {
    title: "NH₃",
    tit_ko: "암모니아",
    alias: "따뜻한 리더",
    description: "암모니아(NH₃)는 강한 결합을 통해 다른 물질과 상호작용해요. 당신의 따뜻한 리더십과 사람들과의 유대감은 암모니아처럼 서로를 연결하는 강한 결합력을 발휘해요.",
    field: "농업 및 산업",
    info: "암모니아는 비료와 냉각제에 사용돼요.",
    best: "C",
    best_ko: "탄소",
    best_comment: "탄소(C)와 암모니아(NH₃)는 큰 반응 없이 공존할 수 있어요.",
    worst: "Mg",
    worst_ko: "마그네슘",
    worst_comment: "암모니아(NH₃)와 마그네슘(Mg)은 폭발적인 반응을 일으킬 수 있어요."
},

ENTJ: {
    title: "Fe",
    tit_ko: "철",
    alias: "강력한 지휘관",
    description: "철(Fe)은 강한 금속으로, 다른 물질과 결합해 강력한 구조를 형성해요. 당신의 강한 리더십과 목표 지향적인 성격은 철처럼 단단하고 영향력 있는 역할을 수행해요.",
    field: "기계 및 장비",
    info: "철은 기계와 전도체로 사용돼요.",
    best: "Li",
    best_ko: "리튬",
    best_comment: "리튬(Li)과 철(Fe)은 서로 안정적인 금속 화합물을 형성해요. 리튬이 전자를 잃고 철과 결합하면서 안정적인 결합 구조를 형성해, 지속 가능한 상호작용을 유지해요.",
    worst: "C",
    worst_ko: "탄소",
    worst_comment: "철(Fe)과 탄소(C)는 고온에서 불안정한 합금을 형성해 강력한 반응을 일으킬 수 있어요."
}
};

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
        console.log('뒤집힘');
    };

    // 선택된 데이터
    const selectedData = dataSet[result as keyof DataSet] || {};

    return (
        <div className='result'>
            <span className='tit'>결과</span>
            <div className='card_cont'>
                <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleCardClick}>
                    <div className='inner'>
                        <div className='front'>
                            <span className='card_header'>
                                <img src='img/s_logo.svg' alt="logo" />
                                <p className='name'>
                                    {name ? `${name}님` : '손님'}
                                </p>
                            </span>
                            <h2 className='type'>{selectedData.title}</h2>
                            <div className='type_box'>
                                {selectedData.alias || ''}
                            </div>
                            <img src={`icon/${result}.png`} alt={selectedData.tit_ko || 'default'} />
                            <span className='card_footer'>
                                <div>
                                    <img src='img/Icon.svg' alt="icon" />
                                    <p>{selectedData.title || ''}</p>
                                </div>
                                <p className='tit_ko'>{selectedData.tit_ko || ''}</p>
                            </span>
                        </div>
                        <div className='back'>
                            <p>{selectedData.description || '추가 정보를 확인하세요.'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='info'>
                <img src='img/Icon_Arrow.svg' alt="arrow" />
                <p>카드를 뒤집어 <br /> 자세한 정보를 확인하세요.</p>
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
                            <p className='tit'>{selectedData.title}</p>
                            <span>{selectedData.tit_ko}</span>
                        </span>

                        <span>
                            <p className='tit'>{selectedData.best}</p>
                            <span>{selectedData.best_ko}</span>
                        </span>
                    </div>
                </div>
                <div className='mix_card'>
                    <p className='tit'>격렬한 반응</p>
                    <div className='name_tag'>

                    <span>
                        <p className='tit'>{selectedData.title}</p>
                        <span>{selectedData.tit_ko}</span>
                    </span>
                    <span>
                        <p className='tit'>{selectedData.worst}</p>
                        <span>{selectedData.worst_ko}</span>
                    </span>
                  </div>
                </div>
            </div>
            <img className='char' src='img/char.png' alt="character" />
            <div className='cont'>
                <div className='best'>
                    <p>나와 잘 맞는 분자는?</p>
                    <span>{selectedData.best}</span>
                    <div>
                        <p>({selectedData.title}) vs. ({selectedData.best})</p>
                        {selectedData.best_comment}
                    </div>
                </div>
                <div className='worst'>
                    <p>나와 맞지 않는 분자는?</p>
                    <span>{selectedData.worst}</span>
                    <div>
                        <p>({selectedData.title}) vs. ({selectedData.worst})</p>
                        {selectedData.worst_comment}
                    </div>
                </div>
            </div>
            {/* <button onClick={() => window.history.back()}>다시하기</button> */}
        </div>
    );
};
