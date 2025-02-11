import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function transcribeAudio(audioBlob: Blob) {
  try {
    console.log('Creating audio file for transcription...');
    const audioFile = new File([audioBlob], "recording.webm", { 
      type: "audio/webm;codecs=opus"
    });
    console.log('Audio file created:', audioFile.size, 'bytes');

    console.log('Sending to OpenAI for transcription...');
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "en",
    });
    console.log('Transcription received:', transcription);

    return transcription;
  } catch (error) {
    console.error("Error in transcribeAudio:", error);
    throw new Error("Failed to transcribe audio. Please try again.");
  }
}

export async function generateFinalEvaluation(userResponses: string[]) {
  try {
    console.log('Generating final evaluation...');
    const allResponses = userResponses.join("\n\n");
    const prompt = `
      You are an expert Business English evaluator. Analyze the following responses to four business-related questions:

      ${allResponses}

      Provide a detailed evaluation of the speaker's Business English proficiency, covering:
      1. Overall Business English level (e.g., Beginner, Intermediate, Advanced)
      2. Grammar and sentence structure
      3. Vocabulary and use of business terminology
      4. Fluency and coherence
      5. Professional communication skills
      6. Areas for improvement
      7. Strengths

      Format your response in a clear, structured manner using markdown for headings.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful, professional Business English assessment assistant who provides detailed, constructive feedback." },
        { role: "user", content: prompt }
      ],
      max_tokens: 800,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error in generateFinalEvaluation:", error);
    throw new Error("Failed to generate evaluation. Please try again later.");
  }
}
