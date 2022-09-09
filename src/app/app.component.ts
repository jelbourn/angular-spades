import { Component } from '@angular/core';
import {Card, cardValues, cardSuits} from './card/card';
import {Player} from './player/player';
import {GameRound} from './game-round';

let nextPlayerId = 0;

@Component({
  selector: 'sg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly deck: Card[] = createDeck();
  readonly players = dealPlayers(this.deck);

  currentRound: number = 0;
  currentTrick: Card[] = [];
  activePlayerIndex = this.getFirstPlayerId();
  rounds: GameRound[] = [];

  yourPlayerId = this.players[0].id;

  ngOnInit() {
    this.advanceGame();
  }

  private advanceGame() {
    if (this.currentTrick.length === 4) {
      // advance to the next round
      return;
    }

    if (this.activePlayerIndex !== 0) {
      this.makeAiMove();
    }
  }

  private makeAiMove() {
    const aiPlayer = this.players[this.activePlayerIndex];
    const card = aiPlayer.hand[Math.floor(Math.random() * aiPlayer.hand.length)];
    this.playCard(aiPlayer, card);
  }

  protected playCard(player: Player, card: Card) {
    player.hand.splice(player.hand.indexOf(card), 1);
    this.currentTrick.push(card);
    this.activePlayerIndex = (this.activePlayerIndex + 1) % 4;
    this.advanceGame();
  }

  private getFirstPlayerId() {
    for (const p of this.players) {
      for (const c of p.hand) {
        if (c.value === '2' && c.suit == '♣') {
          return p.id;
        }
      }
    }

    return this.players[0].id;
  }
}





function dealPlayers(deck: Card[]): Player[] {
  const playerResults: Player[] = [];
  for (let i = 0; i < 4; i++) {
    playerResults.push({
      id: nextPlayerId++,
      name: `Player ${i + 1}`,
      hand: []
    });
  }

  for (let i = 0; i < deck.length; i++) {
    playerResults[i % 4].hand.push(deck[i]);
  }

  return playerResults;
}

function createDeck(): Card[] {
  const resultDeck = [];
  for (const s of cardSuits) {
    for (const v of cardValues) {
      resultDeck.push({value: v, suit: s});
    }
  }
  shuffle(resultDeck);
  return resultDeck;
}

function shuffle(deck: Card[]): void {
  for (let i = 0; i < deck.length - 2; i++) {
    const swapIndex = Math.floor(Math.random() * (deck.length - i));
     [deck[i], deck[swapIndex]] = [deck[swapIndex], deck[i]];
  }
}
