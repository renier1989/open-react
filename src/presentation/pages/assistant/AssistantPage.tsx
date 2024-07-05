import { useEffect, useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from "../../components";
import { createThreatUseCase, postQuestionUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AssistantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const [threadId, setThreatId] = useState<string>();

  // obtengo el threadId del localStorage y si no existe lo creo
  useEffect(() => {
    const threadId = localStorage.getItem('threadId');
    if (threadId) {
      setThreatId(threadId);
    } else {
      createThreatUseCase().then(id => {
        setThreatId(id);
        localStorage.setItem('threadId', id);
      })
    }
  }, []);

  useEffect(() => {
    if (threadId) { 
      setMessages((prev)=>[...prev, {text:`Codigo de conversacion: ${threadId}`, isGpt:true}])
    }
  }, [threadId])
  

  const handlePost = async (text: string) => {

    if(!threadId) {
      setMessages((prev)=>[...prev, {text:'No se pudo establecer la comunicación, intente mas tarde.', isGpt:true}])
      return;
    }

    setIsLoading(true);
    // tomo los mensajes anterior y le agrego un nuevo que sera un mensaje mio (PRUEBA)
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);
    console.log('id:', threadId);
    
    const replies = await postQuestionUseCase(threadId, text);
    setIsLoading(false);
    

    for (const reply of replies) {
      for (const message of reply.content) {
        setMessages((prev)=> [...prev, 
          {
            text: message,
            isGpt: (reply.role === 'assistant'),
            info: reply
          }
        ])
      }
    }



    
  }

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2 ">

            {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
            <GptMessage text="Hola, mi nombre Alexandra y seré tu asistente para ayudarte con tus consultas, pudes brindarme tu nombre?" />

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
