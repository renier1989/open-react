import { useState } from "react";
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect } from "../../components";

interface Message {
    text: string;
    isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string, selectedOption: string) => {
        setIsLoading(true);
        const newMessage = `Traduce el siguiente Texto: " ${text} " al idioma: ${selectedOption}`;
        setMessages((prev) => [...prev, { text: newMessage, isGpt: false }]);
        
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
                        <GptMessage text="¿Que texto te gustaria que tradusca para ti?" />

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
                <TextMessageBoxSelect
                    onSendMessage={handlePost}
                    placeholder="Escribe aqui lo que deseas traducir"
                    options={languages}
                />
            </div>
        </>
    )
}
