export default function Welcome({onStartQuiz, total}){
    return(
        <div className="welcome">
            <h1>Seja bem-vinda!</h1>
            <p>Vamos ver se você sabe das coisas mesmo...</p>
            <p>Preparei um quiz especialmente pra você, cheirosa</p>
            <p>Acerte o máximo de músicas que puder...</p>
            <p>São {total} questões ao total</p>
            <button className="buttons" onClick={onStartQuiz}>Pronta!</button>
        </div>
    )
}