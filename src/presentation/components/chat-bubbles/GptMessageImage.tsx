

interface Props{
    text:string;
    imageUrl:string;
    alt: string;
    onImageSelected?: (imageUrl : string) => void;
}

export const GptMessageImage = ({imageUrl, alt,onImageSelected}:Props) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                🤖
            </div>
            <div className="relative  ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                <img 
                    src={imageUrl} 
                    alt={alt} 
                    className=" rounded-xl w-96 h-96 object-cover"
                />
                <button onClick={()=>onImageSelected && onImageSelected(imageUrl)}>
                    <i className="fa-solid fa-arrows-spin mt-3" title="Seleccionar Imagen para Variación"></i>
                </button>
                {/* <span>{text}</span> */}
            </div>
        </div>
    </div>
  )
}
