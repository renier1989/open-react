import { useState } from "react"
import { GptMessage, GptOrthographyMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true);
    // tomo los mensajes anterior y le agrego un nuevo que sera un mensaje mio (PRUEBA)
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // consulta al backend por el usecase de orthographycheck
    const data = await orthographyUseCase(text);
    console.log(data);
    

    // aqui cargo y muestro la informacion al usuario
    const { ok, userScore, errors, message } = data;
    if (!ok) {
      setMessages((prev) => [...prev, { text: 'No se pudo procesar su petición 😥', isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, { text: message, isGpt: true, info: { userScore, errors, message } }]);
    }

    setIsLoading(false);

  }

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2 ">

            {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
            <GptMessage text="Puedes escribir texto aqui y te ayudo con la ortografia. " />

            {/* aqui valido si los mensajes son de GPT o son mios */}
            {messages.map((message, index) => (
              message.isGpt ?
                (<GptOrthographyMessage key={index} {...message.info!} />)
                :
                (<MyMessage key={index} text={message.text} />)
            ))}
            {isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )}

          </div>
        </div>
        <TextMessageBox
          onSendMessage={handlePost}
          placeholder="Escribe aqui tu pregunta"
          disabledCorrections={false}
        />
        {/* <TextMessageBoxFile
          onSendMessage={handlePost}
          placeholder="Escribe aqui tu pregunta"
        /> */}
        {/* <TextMessageBoxSelect
          onSendMessage={handlePost}
          placeholder="Escribe aqui tu pregunta"
          options={[{id:"1", text:"Hola Mundo"}, {id:"2", text:"Programando GPT."}]}
        /> */}
      </div>
    </>
  )
}
