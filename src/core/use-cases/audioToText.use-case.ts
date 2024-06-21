import type { AudioToTextResponse } from "../../interfaces";

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {
  try {
    // se prepara la data con el formdata para poderla enviar al endpoint
    const formData = new FormData();
    formData.append("file", audioFile);
    // esto se hace asi porque el prompt es opcional
    if (prompt) {
      formData.append("prompt", prompt);
    }

    const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo generar el audio.");

    const data = (await resp.json()) as AudioToTextResponse;

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
