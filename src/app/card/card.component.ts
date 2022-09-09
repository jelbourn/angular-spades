import { Component, Input } from '@angular/core';
import {Card} from './card';

@Component({
  selector: 'sg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    '[class.red]': 'card.suit === "♥" || card.suit === "♦"',
  }
})
export class CardComponent {
  @Input()
  card: Card | undefined;
}
