/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox, GptMessageSelectableImage } from "../../components";
import { imageGenerationUseCase, imageVariationUseCase } from "../../../core/use-cases";


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  }
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      isGpt: true,
      text: 'Image Tunning',
      info:{
        imageUrl: 'http://localhost:3000/gpt/image-generation/1719172483999.png',
        alt:'Image Tunning'
      }
    }
  ])

  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined,
  })

  const handleVariation = async() =>{
    setIsLoading(true);

    if(originalImageAndMask.original){
      const respuesta = await imageVariationUseCase(originalImageAndMask.original!);
      setIsLoading(false);
  
      if(!respuesta) return;
  
      setMessages((prev)=>[...prev , {text:'Vairación de la imagen',isGpt:true, info:{
        imageUrl : respuesta.url,
        alt: respuesta.alt
      }}])
    }

  }

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
      {
        originalImageAndMask.original &&
        (
          <div className="fixed flex flex-col  items-center top-10 right-10 z-10">
            <span>Editando</span>
            <img 
            className="border rounded-xl w-36 h-36 object-contain"
            src={originalImageAndMask.original} 
            alt="Imagen original" />
            <button onClick={handleVariation} className="btn-primary mt-2">Generar Variación</button>
          </div>
        )

      }


      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2 ">

            {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
            <GptMessage text="Dime que imagen quieres generar" />

            {/* aqui valido si los mensajes son de GPT o son mios */}
            {messages.map((message, index) => (
              message.isGpt ?
                (
                <GptMessageSelectableImage 
                // <GptMessageImage 
                  key={index}
                  text={message.text}
                  imageUrl={message.info?.imageUrl!}
                  alt={message.info?.alt!} 
                  onImageSelected={(url)=>setOriginalImageAndMask({
                    original: url,
                    mask: undefined
                  })}
                  />)
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
