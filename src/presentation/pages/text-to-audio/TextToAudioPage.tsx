import { useState } from "react"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxSelect, GptMessageAudio } from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";


interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text';
}
interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: 'audio';
}

type Message = TextMessage | AudioMessage;

const disclaimer = `## Dame un texto y yo lo regresare como un audio.
  * Nota: Todos los audios son generados por una AI.
`;

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
]

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    // tomo los mensajes anterior y le agrego un nuevo que sera un mensaje mio (PRUEBA)
    setMessages((prev) => [...prev, { text: text, isGpt: false, type: 'text' }]);

    const { ok, mesagge, audioUrl } = await textToAudioUseCase(text, selectedVoice);
    console.log(audioUrl);

    if (!ok) return;
    setMessages((prev) => [...prev, { text: `${selectedVoice} - ${mesagge}`, isGpt: true, audio: audioUrl!, type: 'audio' }]);

    setIsLoading(false);

  }

  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2 ">

            {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
            <GptMessage text={disclaimer} />

            {/* aqui valido si los mensajes son de GPT o son mios */}
            {messages.map((message, index) => (
              message.isGpt ?
                (
                  message.type === 'audio' ? (
                    <GptMessageAudio key={index} text={message.text} audioUrl={message.audio} />
                  ) : (
                    <MyMessage key={index} text={message.text} />
                  )
                )
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
          placeholder="Escribe aqui el texto"
          options={voices}
        />
      </div>
    </>
  )
}
