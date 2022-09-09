import { Component, Input } from '@angular/core';
import {Player} from './player';

@Component({
  selector: 'sg-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  @Input()
  player: Player | undefined;
}
