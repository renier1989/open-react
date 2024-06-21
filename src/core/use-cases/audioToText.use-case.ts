export const audioToTextUseCase = async( audioFile : File,prompt? : string) =>{

    try {

        console.log({audioFile, prompt});
        

        // const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify({prompt,file})
        // });

        // if(!resp.ok) throw new Error("No se pudo generar el audio.");

        // const audioFile = await resp.blob();
        // const audioUrl = URL.createObjectURL(audioFile);
        
        // return {
        //     ok: true,
        //     mesagge: prompt,
        //     audioUrl: audioUrl
        // }

    } catch (error) {
        // return {
        //     ok : false,
        //     message: 'No se pudo generar el audio.'
        // }
    }


}