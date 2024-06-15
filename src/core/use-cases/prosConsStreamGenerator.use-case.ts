export async function* prosConsStreamGeneratorUseCase(prompt: string) {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        // TODO: abortSignal
      }
    );

    if (!resp.ok) throw new Error("No se pudo procesar tu pregunta.");

    const reader = resp.body?.getReader();
    if (!reader) {
      console.log("No se pudo generar el Reader, intente nuevamente");
      return null;
    }

    const decoder = new TextDecoder();
    let text = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      const decoderChunk = decoder.decode(value, { stream: true });
      text += decoderChunk;
      yield text;
    }
  } catch (error) {
    console.log(error);

    return null;
  }
}
