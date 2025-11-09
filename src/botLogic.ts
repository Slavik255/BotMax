export interface BotResponse {
  text: string;
}

export function getBotReply(userMessage: string): BotResponse {
  const msg = userMessage.trim().toLowerCase();

  if (/привет|здравствуй|hi|hello/i.test(msg)) {
    return { text: 'Привет! Чем могу помочь?' };
  }

  if (/пока|до свидания|bye/i.test(msg)) {
    return { text: 'До встречи! 🌟' };
  }

  return {
    text: `Вы сказали: "${userMessage}". Я пока учусь — скоро смогу отвечать умнее!`
  };
}