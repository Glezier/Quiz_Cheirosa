import { useState, useEffect } from 'react';
import Welcome from './components/Welcome.jsx';
import Quiz from './components/Quiz.jsx';
import Finish from './components/Finish.jsx';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);

  // Use URL relativa - funciona tanto em dev quanto em produção
  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetch(`${API_URL}/songs`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Erro ao carregar músicas:', err));
  }, []);

  const total = data.length;
  
  function startQuiz(){
    setScreen('quiz');
  }

  function next(correct){
    if (correct){
      setScore(score+1);
      return;
    }
    skip();
  }

  function skip(){
    const nextIndex = current + 1;
    if (nextIndex >= total){
      setScreen('finish');
    }
    else{
      setCurrent(nextIndex);
    }
  }

  function restart(){
    setScreen('welcome');
    setCurrent(0);
    setScore(0);
  }

  return(
    <> 
      {screen == 'welcome' && (
        <Welcome 
        onStartQuiz = {startQuiz}
        total = {total}/>
      )}

      {screen == 'quiz' && (
        <Quiz 
        key = {current}
        question = {data[current]}
        current = {current}
        total = {total}
        score = {score}
        onNext = {next}
        onSkip = {skip}/>
      )}

      {screen == 'finish' && (
        <Finish 
        score = {score}
        total = {total}
        restart = {restart}/>
      )}
    </>
  )
}