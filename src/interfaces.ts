export interface AppData {}

export interface ActionData {
  action: any;
}


export interface GameActions {
  gameOver: () => void
  won: () => void
  setScore: (score: number) => void
}