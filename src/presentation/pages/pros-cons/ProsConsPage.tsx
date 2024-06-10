import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsDiscusserUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;

}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true);
    // tomo los mensajes anterior y le agrego un nuevo que sera un mensaje mio (PRUEBA)
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const data = await prosConsDiscusserUseCase(text);
    console.log(' aqui esta la respuesta:', data);

    // aqui cargo y muestro la informacion al usuario
    const { ok, content } = data;
    if (!ok) {
      setMessages((prev) => [...prev, { text: 'No se pudo procesar su petición 😥', isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, { text: content, isGpt: true }]);
    }


    // TODO: aqui se llamara al useCase el caso de uso
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // TODO: añadir el mensaje de GPT aqui 
  }

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2 ">

            {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
            <GptMessage text="Puedes escriber aqui tu pregunta y te podre dar mis puntos de vista indicandote los PROS Y CONTRAS." />

            {/* aqui valido si los mensajes son de GPT o son mios */}
            {messages.map((message, index) => (
              message.isGpt ?
                (<GptMessage key={index} text={message.text} />)
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
      </div>
    </>
  )
}
