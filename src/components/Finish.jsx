export default function Finish({score, total, restart}){
    const sucess = ((score*100)/total);

    return(
        <div className="welcome">
            <h2>Você chegou ao final do quiz!</h2>
            {sucess>=70 && (<p>Parabéns, você acertou {sucess.toFixed(2)}% das questões.</p>)}
            {sucess<70 && (<p>Continue praticando, você acertou {sucess.toFixed(2)}% das questões.</p>)}
            <p>Amo você minha gatona!</p>
            <button className='buttons'onClick={restart}>
                Jogar novamente
            </button>
        </div>
    )
}
