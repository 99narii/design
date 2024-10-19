import React, { useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

interface Question {
  questionText: string;
  options: { text: string; value: string }[];
}

// 질문 배열
const questions: Question[] = [
  {
    questionText: '새로운 모임에 초대받았을 때 나는?',
    options: [
      { text: '가서 사람들과 어울리며 에너지를 얻자!', value: 'E' },
      { text: '혼자 있는 시간을 더 즐기고 싶어, 부담스러워.', value: 'I' },
    ],
  },
  {
    questionText: '주말에 나는?',
    options: [
      { text: '친구들과 만나서 시간을 보내는 것이 즐거워!', value: 'E' },
      { text: '집에서 혼자만의 시간을 보내며 휴식을 취하는 게 좋아.', value: 'I' },
    ],
  },
  {
    questionText: '스트레스가 많을 때 나는?',
    options: [
      { text: '친구들과 수다를 떨며 스트레스를 풀어야지!', value: 'E' },
      { text: '혼자만의 시간을 가지며 생각을 정리하고 싶어.', value: 'I' },
    ],
  },
  {
    questionText: '새로운 정보를 접할 때 나는?',
    options: [
      { text: '구체적이고 실질적인 정보를 중요하게 생각해.', value: 'S' },
      { text: '개념과 가능성, 큰 그림을 더 중요하게 생각해.', value: 'N' },
    ],
  },
  {
    questionText: '일을 할 때 나는?',
    options: [
      { text: '현실적이고 확실한 방법을 선호해.', value: 'S' },
      { text: '창의적이고 새로운 접근 방식을 더 선호해.', value: 'N' },
    ],
  },
  {
    questionText: '미래를 생각할 때 나는?',
    options: [
      { text: '지금 당장 현실에서 할 수 있는 것에 집중해.', value: 'S' },
      { text: '미래에 일어날 수 있는 가능성에 대해 상상하는 걸 좋아해.', value: 'N' },
    ],
  },
  {
    questionText: '친구가 고민을 털어놓을 때 나는?',
    options: [
      { text: '논리적으로 문제를 해결해 주고 싶어.', value: 'T' },
      { text: '감정을 공감하며 위로해 주고 싶어.', value: 'F' },
    ],
  },
  {
    questionText: '결정할 때 나는?',
    options: [
      { text: '이성적으로 상황을 분석해서 결정을 내려.', value: 'T' },
      { text: '내 감정과 다른 사람의 감정을 고려해 결정해.', value: 'F' },
    ],
  },
  {
    questionText: '갈등 상황에서 나는?',
    options: [
      { text: '객관적이고 논리적으로 문제를 해결하려 해.', value: 'T' },
      { text: '상대방의 감정을 고려해 상황을 부드럽게 해결하려 해.', value: 'F' },
    ],
  },
  {
    questionText: '일을 할 때 나는?',
    options: [
      { text: '마감일 전에 미리 계획을 세워 진행하는 게 좋아.', value: 'J' },
      { text: '상황에 맞춰 즉흥적으로 진행하는 게 더 편해.', value: 'P' },
    ],
  },
  {
    questionText: '여행을 준비할 때 나는?',
    options: [
      { text: '철저히 계획을 세우고 모든 것을 준비해야 해.', value: 'J' },
      { text: '그때그때 기분에 따라 즉흥적으로 움직이는 것이 더 재미있어.', value: 'P' },
    ],
  },
  {
    questionText: '일을 끝내는 방식에 대해 나는?',
    options: [
      { text: '모든 것을 철저히 정리하고 일을 끝내는 게 좋아.', value: 'J' },
      { text: '마지막에 급하게 처리해도 괜찮아, 결과만 맞추면 돼.', value: 'P' },
    ],
  },
];

// 질문을 랜덤으로 섞기
const shuffleArray = (array: Question[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // 배열 요소 교환
  }
  return array;
};

export const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // 랜덤으로 섞인 질문 배열
  const shuffledQuestions = shuffleArray(questions);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (newAnswers.length < shuffledQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 질문이 끝났을 때 결과 페이지로 이동
      handleNavigation(newAnswers);
    }
  };

  const handleNavigation = (answers: string[]) => {
    // 4자리 MBTI 결과 생성
    const result = [
      answers.filter(answer => answer === 'E').length > answers.filter(answer => answer === 'I').length ? 'E' : 'I',
      answers.filter(answer => answer === 'S').length > answers.filter(answer => answer === 'N').length ? 'S' : 'N',
      answers.filter(answer => answer === 'T').length > answers.filter(answer => answer === 'F').length ? 'T' : 'F',
      answers.filter(answer => answer === 'J').length > answers.filter(answer => answer === 'P').length ? 'J' : 'P'
    ].join('');

    navigate('/result', { state: { result } }); 
  };

  return (
    <div className='test'>
      <header>
        <h1>{`${currentQuestion + 1}/${shuffledQuestions.length}`}</h1>
        <div className='step'>
          {Array.from({ length: shuffledQuestions.length }, (_, index) => (
            <span
              key={index}
              className={`dot ${index < currentQuestion ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </header>
      <div className='quest'>
        {shuffledQuestions[currentQuestion]?.questionText || 'No more questions'}
      </div>
      <div className='answer'>
        {shuffledQuestions[currentQuestion]?.options.map((option, index) => (
          <button
            key={index}
            className={index % 2 === 0 ? 'blue' : 'orange'}
            onClick={() => handleAnswer(option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};
