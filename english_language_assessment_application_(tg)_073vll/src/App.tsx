import React, { useState, useRef, useEffect } from 'react';
import { Mic, X, Check } from 'lucide-react';
import { Message } from './types';
import { businessQuestions } from './constants/questions';
import { transcribeAudio, generateFinalEvaluation } from './services/openai';
import { ErrorBoundary } from './components/ErrorBoundary';
import RethaGoLogo from './components/RethaGoLogo';
import Navbar from './components/Navbar';
import MessageList from './components/MessageList';
import { useAudioRecorder } from './hooks/useAudioRecorder';
import * as Progress from '@radix-ui/react-progress';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to Retha GO Business English Assessment. Tap the mic to begin!"
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isRecording, recordingTime, startRecording, stopRecording, chunks } = useAudioRecorder();
  const [liveTranscript, setLiveTranscript] = useState('');
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const handleStartAssessment = () => {
    setIsAssessmentStarted(true);
    setMessages(prevMessages => [
      ...prevMessages, 
      { 
        role: 'assistant', 
        content: `Great! Let's begin the Business English assessment. I'll ask you 4 business-related questions. After each answer, I'll provide feedback.

${businessQuestions[0]}` 
      }
    ]);
  };

  const cancelRecording = () => {
    stopRecording();
    setMessages(prevMessages => [...prevMessages]); // Trigger re-render
    setLiveTranscript(''); // Clear live transcript
  };

  const submitRecording = () => {
    stopRecording();
    if (chunks.length > 0) {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      sendAudioToAI(audioBlob);
      setLiveTranscript(''); // Clear live transcript after submission
    } else {
      setError("No audio recorded. Please try again.");
    }
  };

  const sendAudioToAI = async (audioBlob: Blob) => {
    setIsThinking(true);
    setError(null);

    try {
      const transcription = await transcribeAudio(audioBlob);

      if (!transcription.text) {
        throw new Error('No transcription received');
      }

      setMessages(prevMessages => [...prevMessages, { role: 'user', content: transcription.text }]);
      setUserResponses(prev => [...prev, transcription.text]);

      if (currentQuestionIndex < businessQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        const nextQuestion = businessQuestions[currentQuestionIndex + 1];
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: nextQuestion }]);
      } else {
        await provideFinalEvaluation();
      }
    } catch (error: any) {
      console.error("Error processing audio:", error);
      setError(`Error processing audio: ${error.message}`);
    } finally {
      setIsThinking(false);
    }
  };

  const provideFinalEvaluation = async () => {
    setIsThinking(true);
    setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Analyzing your responses..." }]);
    try {
      const aiResponse = await generateFinalEvaluation(userResponses);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: aiResponse }]);
    } catch (error: any) {
      console.error("Error generating final evaluation:", error);
      setError("Error generating evaluation. Please try again.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <Navbar />

        <main className="flex-grow flex flex-col items-center justify-start p-4">
          {/* Messages */}
          <div className="flex-grow overflow-y-auto w-full max-w-md mb-4">
            <MessageList messages={messages} error={error} isThinking={isThinking} />
          </div>

          {/* Progress Indicator */}
          {isAssessmentStarted && (
            <div className="w-full max-w-md mb-2">
              <Progress.Root className="relative overflow-hidden bg-gray-200 rounded-full h-2 w-full">
                <Progress.Indicator
                  className="bg-blue-500 h-full transition-all duration-500"
                  style={{ width: `${((currentQuestionIndex + 1) / businessQuestions.length) * 100}%` }}
                />
              </Progress.Root>
            </div>
          )}

          {/* Audio Input */}
          {isAssessmentStarted && (
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-3xl shadow-lg">
              {/* Live Transcript */}
              {isRecording && (
                <div className="text-center text-gray-700 mb-2">
                  {liveTranscript}
                </div>
              )}
              <div className="flex justify-between items-center">
                <button
                  onClick={cancelRecording}
                  className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center"
                  disabled={!isRecording || isThinking}
                >
                  <X className="w-6 h-6" />
                </button>

                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className="w-20 h-20 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-lg"
                  disabled={isThinking}
                >
                  <Mic className="w-10 h-10" />
                </button>

                <button
                  onClick={submitRecording}
                  className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center"
                  disabled={!isRecording || isThinking}
                >
                  <Check className="w-6 h-6" />
                </button>
              </div>
              <div className="text-center mt-2 text-gray-600">
                {String(Math.floor(recordingTime / 60)).padStart(2, '0')}:
                {String(recordingTime % 60).padStart(2, '0')}
              </div>
            </div>
          )}

          {!isAssessmentStarted && (
            <button 
              onClick={handleStartAssessment}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full transition-colors text-lg"
            >
              Start Assessment
            </button>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
