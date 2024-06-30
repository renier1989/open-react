/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";


interface Props{
    text:string;
    imageUrl:string;
    alt: string;
    onImageSelected?: (imageUrl : string) => void;
}

export const GptMessageSelectableImage = ({imageUrl}:Props) => {

    const originalImageRef = useRef<HTMLImageElement>();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
    
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin= "Anonymous";
        image.src = imageUrl;
        originalImageRef.current = image;
        image.onload = ()=>{
            ctx?.drawImage(image, 0 ,0 , canvas.width, canvas.height);
        } 
    }, [])
    


  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
                🤖
            </div>
            <div className="relative  ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                
                <canvas
                    ref={canvasRef}
                    width={1024}
                    height={1024}
                />


                {/* <img 
                    src={imageUrl} 
                    alt={alt} 
                    className=" rounded-xl w-96 h-96 object-cover"
                />
                <button onClick={()=>onImageSelected && onImageSelected(imageUrl)}>
                    <i className="fa-solid fa-arrows-spin mt-3" title="Seleccionar Imagen para Variación"></i>
                </button> */}
                
            </div>
        </div>
    </div>
  )
}
