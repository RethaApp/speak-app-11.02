export interface AssessmentScore {
  grammar: number;
  fluency: number;
  vocabulary: number;
  businessVocabulary: number;
  average: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'general' | 'business' | 'followup';
}

export interface Assessment {
  id: string;
  date: string;
  scores: AssessmentScore;
  feedback: string;
  recording: string;
}
