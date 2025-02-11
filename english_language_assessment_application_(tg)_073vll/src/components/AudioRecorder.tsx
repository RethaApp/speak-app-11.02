import React from 'react';
import { Mic, Square } from 'lucide-react';
import { AudioRecorderProps } from '../types';

export function AudioRecorder({ 
  onRecordingComplete, 
  isRecording, 
  onStartRecording, 
  onStopRecording 
}: AudioRecorderProps) {
  return (
    <div className="p-4 bg-gray-750 border-t border-gray-700">
      <div className="flex items-center justify-center space-x-4">
        {isRecording ? (
          <button
            onClick={onStopRecording}
            className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            <Square className="w-8 h-8" />
          </button>
        ) : (
          <button
            onClick={onStartRecording}
            className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            <Mic className="w-8 h-8" />
          </button>
        )}
      </div>
      {isRecording && (
        <div className="text-center mt-2 text-blue-400">
          Recording... Speak now
        </div>
      )}
    </div>
  );
}
