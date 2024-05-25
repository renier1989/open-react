import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"

export const OrthographyPage = () => {
  return (
    <>
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2 ">

              {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
              <GptMessage text="Puedes escribir texto aqui y te ayudo con la ortografia. "/>
              <MyMessage text="Hola OpenIA "/>
              <TypingLoader className="fade-in"/>
          </div>
        </div>
        <TextMessageBox
          onSendMessage={(message)=>console.log(message)}
          placeholder="Escribe aqui tu pregunta"
          disabledCorrections
        />
      </div>
    </>
  )
}
