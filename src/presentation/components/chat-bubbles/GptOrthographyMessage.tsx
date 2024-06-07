

interface Props{
    userScore: number;
    errors: string[];
    message: string;
}

export const GptOrthographyMessage = ({userScore, errors, message}:Props) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                🤖
            </div>
            <div className="relative  ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                <h2 className="text-2xl">Porcentaje de acierto {userScore}%</h2>

                <p>{message}</p>

                { errors.length && (
                    <>
                        <h2 className="text-2xl">Errores Presentes:</h2>
                        <ul>
                            {
                                errors.map((error, i)=>(
                                    <li key={i}>
                                        {error}
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                )}
            
            </div>
        </div>
    </div>
  )
}
