import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxFile } from "../../components";
import { audioToTextUseCase } from "../../../core/use-cases";

interface Message {
    text: string;
    isGpt: boolean;
}

export const AudioToTextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string , audioFile : File) => {
        setIsLoading(true);
        
        setMessages((prev) => [...prev, { text: text, isGpt: false }]);

        await audioToTextUseCase(audioFile, text);
        
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
                        <GptMessage text="Hola , ¿Que audio queires transcribir?" />

                        {/* aqui valido si los mensajes son de GPT o son mios */}
                        {messages.map((message, index) => (
                            message.isGpt ?
                                (<GptMessage key={index} text="esto es de GPT." />)
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
                <TextMessageBoxFile
                    onSendMessage={handlePost}
                    placeholder="Escribe aqui tu texto"
                    disabledCorrections={false}
                    accept="audio/*"
                />
            </div>
        </>
    )
}
