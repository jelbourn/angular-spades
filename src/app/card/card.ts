export const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
export const cardSuits = ['♠' , '♣' ,  '♥' , '♦'] as const;

export interface Card {
  value: string;

  suit: '♠' | '♣' |  '♥' | '♦';
}
