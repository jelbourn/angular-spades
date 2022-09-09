import {Card} from '../card/card';

export interface Player {
   id: number;
   name: string;
   hand: Card[];
}
