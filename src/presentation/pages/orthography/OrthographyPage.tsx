import { GptMessage, MyMessage } from "../../components"

export const OrthographyPage = () => {
  return (
    <>
      <div className="chat-container">
        <div className="chat-message">
          <div className="grid grid-cols-12 gap-y-2 ">

              {/* aqui muestro un mensaje de bienvenida o presentacacion para esta funcionaldiad */}
              <GptMessage text="Puedes escribir texto aqui y te ayudo con la ortografia. "/>
              <MyMessage text="Hola OpenIA "/>

          </div>
        </div>
      </div>
    </>
  )
}
