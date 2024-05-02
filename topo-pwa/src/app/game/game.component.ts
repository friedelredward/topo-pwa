import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

export enum LevelSpeed{
  LOW= "LOW",
  MEDIUM= "MEDIUM",
  HIGH= "HIGH"
}
export const LEVEL_TO_MS ={
  LOW: 500,
  MEDIUM: 750,
  HIGH: 1000
}
export const LEVEL_TO_PTS ={
  LOW: 10,
  MEDIUM: 20,
  HIGH: 30
}
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy{
  readonly levelSpeed= LevelSpeed;
  readonly level2ms= LEVEL_TO_MS;
  readonly BOARD_CELLS= 9;
  username: string | null = '';
  isGameRunning= false;
  gameSpeed: number= LEVEL_TO_MS[LevelSpeed.LOW];
  actualPoints: number= 0;

  constructor(private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.username= this.route.snapshot.paramMap.get('id');
    //get actualpoints for username
  }

  stopGame() {
    this.isGameRunning= false;
  }

  startGame() {
    this.isGameRunning=true;
  }

  ngOnDestroy(): void {
    console.log("destroying..., linter warning avoid.")
  }
}
