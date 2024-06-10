import { ProsConsResponse } from "../../interfaces";

export const prosConsDiscusserUseCase = async (prompt: string) => {
try {
    const resp = await fetch(
    `${import.meta.env.VITE_GPT_API}/pros-cons-discusser`,
    {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    }
    );

    if (!resp.ok) throw new Error("No se pudo procesar tu pregunta.");

    const data = (await resp.json()) as ProsConsResponse;

    return {
    ok: true,
    ...data,
    };
} catch (error) {
    return {
    ok: false,
    content: "No se pudo procesar tu pregunta.",
    };
}
};
