/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptMessageImage } from "../../components";
import { imageGenerationUseCase } from "../../../core/use-cases";


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true);
    // tomo los mensajes anterior y le agrego un nuevo que sera un mensaje mio (PRUEBA)
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // TODO: aqui se llamara al useCase el caso de uso
    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);

    if (!imageInfo) {
      return setMessages((prev) => [...prev, { text: 'No se pudo generar la imagen', isGpt: true }]);
    }

    // TODO: añadir el mensaje de GPT aqui 
    setMessages((prev) => [...prev, {
      text,
      isGpt: true,
      info: {
        imageUrl: imageInfo.url,
        alt: imageInfo.alt
      }
    }])

  }

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2 ">

            {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
            <GptMessage text="Dime que imagen quieres generar" />

            {/* aqui valido si los mensajes son de GPT o son mios */}
            {messages.map((message, index) => (
              message.isGpt ?
                (<GptMessageImage key={index}
                  text={message.text}
                  imageUrl={message.info?.imageUrl!}
                  alt={message.info?.alt!} />)
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
