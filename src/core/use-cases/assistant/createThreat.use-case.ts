export const createThreatUseCase = async () => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_ASSISTANT_API}/create-thread`,
      { method: "POST" }
    );
    const { id } = (await resp.json()) as { id: string };
    return id;
  } catch (error) {
    throw new Error("No se pudo crear el Threat.");
  }
};
