export interface AppData {}

export interface ActionData {
  action: any;
}

export interface GameActions {
  gameOver: () => void;
  won: () => void;
  setMessage: (message: string, durationSeconds: number) => void;
  setScore: (score: number) => void;
}
