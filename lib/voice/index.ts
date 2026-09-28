export interface VoiceRecognitionResult {
  transcript: string;
  error?: string;
}

type SpeechRecognitionEventLike = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export function isVoiceSupported(): boolean {
  if (typeof window === 'undefined') return false;

  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

  return typeof speechWindow.SpeechRecognition !== 'undefined' || typeof speechWindow.webkitSpeechRecognition !== 'undefined';
}

export function speakText(text: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}

export function createVoiceRecognizer(onResult: (text: string) => void, onError?: (message: string) => void) {
  if (typeof window === 'undefined') return null;

  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

  const SpeechRecognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: SpeechRecognitionEventLike) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = () => {
    if (onError) onError('Voice input could not be recognized. Please try again or type your request instead.');
  };

  return recognition;
}
