import { useState, useRef, useEffect } from 'react';

export default function Quiz({    
    question,
    current,
    total,
    score,
    onNext,
    onSkip
}) {
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [answered, setAnswered] = useState(false);
    const [attempts, setAttempts] = useState(3);

    const inputRef = useRef(null);

    useEffect(() => {    
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [question]);
        
    function handleInput(e){
        setAnswer(e.target.value);
    }

    function verify(){
        if (!answer.trim()){
            setMessage('Digite algo');
            return;
        }
    
        const correct = (answer.trim().toLowerCase() === question.musica.toLowerCase());

        if (correct){
            setMessage("Parabéns, acertou!");
            setAnswered(true);
            onNext(true);
        }
        else{
            const newAttempts = attempts - 1;
            setAttempts(newAttempts);
            if (newAttempts > 0){
                setMessage("Errou hihihiihihihi");
            }
            else{
                setMessage(`É menino, suas chances acabaram.\n A resposta é ${question.musica}.`);
            }
        }
        setAnswer('');
    }

    function next(){
        onNext(false);
        setAnswer(false);
        setMessage('');
    }

    function sendEnter(e){
        if (e.key == 'Enter' && !answered && attempts > 0){
            verify();
        }
    }

    return (
        <div className='quiz'>
            <div className='top'>
                <span className='pergunta icons'>
                    Pergunta {current + 1} de {total}
                </span>
                <span className='total icons'>
                    Pontos: {score}
                </span>                    
            </div>
            <h2 className='trecho'>
                {question.trecho}
            </h2>
            {!answered && attempts > 0 && (
                <div className='validation'>
                    <div className='input'>
                        <input 
                        ref={inputRef}
                        type="text"
                        value={answer}
                        onChange={handleInput}
                        onKeyUp={sendEnter}
                        placeholder="Digite sua resposta" />
                    </div>
                    <div className='buttons-input'>
                        <button className='buttons' onClick={verify}>
                            Responder
                        </button>
                        <button className='buttons' onClick={onSkip}>
                            Pular
                        </button>
                    </div>
                </div>
            )}

            {answered && (
                <>
                <div className='player'>
                    <img 
                    src={`/${question.capa}`}
                    alt={question.musica}
                    />
                    <audio 
                    controls 
                    src={`/${question.audio}`}
                    ></audio>
                </div>
                <button 
                onClick={next}
                className='buttons'>
                    Próxima
                </button>
                </>
            )}
            {message && (
                <p className='messages'>{message}</p>
            )}

            {attempts > 0 && !answered && (
                <p className='messages'>
                    Você possui {attempts} {attempts === 1 ? "tentativa restante" : "tentativas restantes"}
                </p>
            )}

            {attempts === 0 && !answered && (
                <button onClick={onSkip} className='buttons'>
                    Continuar
                </button>
            )}
        </div>
    )
}