export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}
