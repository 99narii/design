import React, { useState } from 'react';
import './style.scss';
import { useNavigate, useLocation  } from 'react-router-dom';

interface Question {
  questionText: string;
  options: { text: string; value: string }[];
}

// 질문 배열
const questions: Question[] = [
  {
    questionText: '같이 놀다가 친구가 갑자기 다른 친구를 부른다고 한다면?',
    options: [
      { text: '당연하지! 내 친구의 친구면 너도 내 친구야!', value: 'E' },
      { text: '아ㅠㅠ 어색할거 같은데...........ㅠㅠ', value: 'I' },
    ],
  },
  {
    questionText: '눈병 걸려서 강제로 쉬어야 한다면?',
    options: [
      { text: '친구들이랑 만나기로 한 약속은....? 밖에 나가서 광합성 해야하는데...?ㅠㅠ', value: 'E' },
      { text: '합법적 약속 취소 가능 ㅋ 밀린 넷플릭스, 게임, 만화책 다 읽어야지~', value: 'I' },
    ],
  },
  {
    questionText: '시험 공부에 지쳤는데 갑자기 친구가 기분 전환겸 저녁에 놀러가자고 한다면?',
    options: [
      { text: '힘들어....빨리 공부 끝내고 쉬자....... ', value: 'I' },
      { text: '그래 중간중간 기분전환도 필요해! 바다보러 가자!', value: 'E' },
    ],
  },
  {
    questionText: '눈 앞에 사과가 있어!',
    options: [
      { text: '빨갛네? 맛있겠다....!', value: 'S' },
      { text: '사과.....? 아이폰....?', value: 'N' },
    ],
  },
  {
    questionText: '비행기를 탔는데 갑자기 흔들린다면?',
    options: [
      { text: '왜 흔들리지...? 사고났나...? 구명조끼 어딨지...?', value: 'N' },
      { text: '아;; 어지러워;;', value: 'S' },
    ],
  },
  {
    questionText: '죽으면 어떡하지?',
    options: [
      { text: '죽으면 죽는거지 뭐 어떡해.', value: 'S' },
      { text: '신과함께처럼 재판 받으면 어떡하지...? 어떻게 변명하지...?', value: 'N' },
    ],
  },
  {
    questionText: '친구가 헤어졌다고 연락이 왔을때 어떻게 위로해줄까?',
    options: [
      { text: '사람은 사람으로 잊는거래 힘내.', value: 'T' },
      { text: '괜찮아? 너무 힘들겠다 전화할까?', value: 'F' },
    ],
  },
  {
    questionText: '야 나 늦을거 같아 미안 ㅠ 버스 놓쳐서 택시탔는데 차가 막혀 ㅠㅠ ?',
    options: [
      { text: '음 알겠어 기다리고 있을게!(이유가 타당하군)', value: 'T' },
      { text: '음 알겠어 기다리고 있을게!(근데 사과는?)', value: 'F' },
    ],
  },
  {
    questionText: '너 공부 안하는거 같은데 점수 잘 나왔네? 너 천재인가봐!',
    options: [
      { text: '뭐라는거야 나 공부 열심히 했거든?(언짢)', value: 'F' },
      { text: '그런가? 나 공부에 재능있나?(기분 좋음)', value: 'T' },
    ],
  },
  {
    questionText: '내일은 꿈에 그리던 여행날!',
    options: [
      { text: '벌써 기대된다 ㅎㅎ 카페는 어디가지? 디저트는 뭘로 시키지? 밥은 어디서 먹을까? ', value: 'J' },
      { text: '무계획이 계획이오.(엄근진)', value: 'P' },
    ],
  },
  {
    questionText: '내일부터 갓생 살꺼야!',
    options: [
      { text: '아침 일찍 일어나서 씻고 운동 갔다가 밥먹어야지~', value: 'P' },
      { text: '6시에 기상해서 15분동안 씻고 1시간 아침운동...갔다와서 30분동안 아침...', value: 'J' },
    ],
  },
  {
    questionText: '갑자기 친구한테 나오라고 연락 올 때!',
    options: [
      { text: '(나갈 준비중이라 답장 못함)', value: 'P' },
      { text: '갑자기는 힘들거같아, 적어도 전날에 알려주면 좋겠어.', value: 'J' },
    ],
  },
];


export const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const location = useLocation();
  const { name } = location.state || { name: '' };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (newAnswers.length < questions.length) {
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

    navigate('/result', { state: { result, name } });
  };

  return (
    <div className='test'>
      <header>
        <h1 className='number'>{currentQuestion < 9 ? `0${currentQuestion + 1}` : currentQuestion + 1}</h1>
        <div className='step'>
          {Array.from({ length: questions.length }, (_, index) => (
            <span
              key={index}
              className={`dot ${index < currentQuestion ? 'active' : ''}`}
            ></span>
          ))}
        </div>
      </header>
      <div className='quest'>
        <img src='img/mark.svg' />
        {questions[currentQuestion]?.questionText || 'No more questions'}
      </div>
      <div className='answer'>
        {questions[currentQuestion]?.options.map((option, index) => (
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
