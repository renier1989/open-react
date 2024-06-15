import { useState } from "react";
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { prosConsStreamGeneratorUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) => {
    setIsLoading(true);
    // tomo los mensajes anterior y le agrego un nuevo que sera un mensaje mio (PRUEBA)
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // forma de hacer el stream con una funcion generadora
    const stream = await prosConsStreamGeneratorUseCase(text);
    setIsLoading(false);
    setMessages((messages) => [...messages, { text: '', isGpt: true }]);
    for await (const text of stream) {
      setMessages((messages) => {
        const newMessage = [...messages];
        newMessage[newMessage.length - 1].text = text;
        return newMessage;
      })
    }





    // // forma de hacer el stream 
    // const reader = await prosConsDiscusserStreamUseCase(text);
    // setIsLoading(false);

    // if(!reader) return;

    // const decoder = new TextDecoder();
    // let message = '';
    // setMessages((messages)=>[...messages, {text:message , isGpt:true}]);

    // // eslint-disable-next-line no-constant-condition
    // while(true){
    //   const {value, done} = await reader.read();
    //   if(done) break;

    //   const decodedChunk = decoder.decode(value, {stream: true});
    //   message+= decodedChunk;

    //   setMessages((messages)=>{
    //     const newMessage = [...messages];
    //     newMessage[newMessage.length - 1].text = message;
    //     return newMessage;
    //   })
    // }



  }

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2 ">

            {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
            <GptMessage text="Que quieres comparar hoy ? " />

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
