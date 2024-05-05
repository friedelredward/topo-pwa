import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {TopoComponent} from "../topo/topo.component";
import {GameService} from "../shared/services/game.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LEVEL_TO_MS, LEVEL_TO_PTS, LevelSpeed} from "../shared/model/LevelSpeed";

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
    TopoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy{
  readonly levelSpeed= LevelSpeed;
  readonly BOARD_CELLS= 9;
  readonly NOTIFICATION_DURATION= 3000;
  username: string | null = '';
  isGameRunning: boolean= false;
  actualLvl: LevelSpeed= LevelSpeed.LOW;
  gameSpeedMs: number= LEVEL_TO_MS[this.actualLvl];
  actualPoints: number= 0;
  moles: number[] = new Array(this.BOARD_CELLS).fill(0).map((x,i)=> i);
  visibleMoles: number[] = [];
  private intervalId: number | null= null;
  /**
   * Number of moles to show (1|2)
   */
  molesCount: number= 2;
  hitAudio: HTMLAudioElement= new Audio('assets/sounds/hit.wav');

  constructor(private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private gameService: GameService
  ) {  }

  ngOnInit(): void {
    //get username
    this.username= this.route.snapshot.paramMap.get('id');
    //set actualpoints for username
    const playerScore= this.gameService.getPlayerScore(this.username);
    this.actualPoints= playerScore && playerScore !== this.actualPoints ? playerScore: this.actualPoints;
    //load audio asset
    this.hitAudio.load();
  }

  stopGame(): void {
    this.isGameRunning= false;
    if (this.intervalId) clearInterval(this.intervalId);
    this.visibleMoles = [];
  }

  startGame(): void {
    this.isGameRunning=true;
    this.getNewVisibleMoles(this.visibleMoles);
    this.setNewInterval(this.gameSpeedMs);
  }

  onMoleHit(isMoleHit: boolean, moleIndex: number){
    if (isMoleHit){
      this.openSnackBar();
      navigator.vibrate(200);
      this.hitAudio.play();
      this.visibleMoles = this.visibleMoles.filter(mole => mole !== moleIndex);
    }
    this.updatePoints(isMoleHit);
  }

  onMolesCountChange($event: number) {
    this.molesCount= $event;
  }

  onLvlSpeedChange(event: LevelSpeed) {
    this.gameSpeedMs= LEVEL_TO_MS[event];
    this.actualLvl= LevelSpeed[event];
    if(this.isGameRunning) this.setNewInterval(this.gameSpeedMs);
  }

  getNewVisibleMoles(moleIndices?: number[]): void{
    this.visibleMoles = this.getRandomMoles(moleIndices);
  }

  isVisibleMole= (moleIndex: number): boolean =>  this.visibleMoles.includes(moleIndex);

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private getRandomMoles(oldRandoms?: number[]): number[] {
    const randoms: number[] = [];
    let allMoles = [...this.moles];
    // Remove oldRandoms from allMoles
    if (oldRandoms) {
      allMoles = allMoles.filter(mole => !oldRandoms.includes(mole));
    }

    while (randoms.length < this.molesCount) {
      const randomIndex = Math.floor(Math.random() * allMoles.length);
      randoms.push(allMoles[randomIndex]);
      // Remove the selected mole from allMoles
      allMoles.splice(randomIndex, 1);
    }

    return randoms;
  }

  private updatePoints(isMoleHit: boolean): void {
    if (!isMoleHit) return; //do nothing
    this.actualPoints= this.actualPoints + LEVEL_TO_PTS[this.actualLvl];
    this.gameService.setPlayerScore(this.username, this.actualPoints);
  }

  private setNewInterval(gameSpeed: number) {
    if (this.intervalId){
      clearInterval(this.intervalId);
    }
    this.intervalId= setInterval( ()=>{
      this.getNewVisibleMoles(this.visibleMoles);
    }, gameSpeed, this.intervalId) as number;
  }

  private openSnackBar() {
    this._snackBar.open(`Good Job ${this.username}!`, "", { duration: this.NOTIFICATION_DURATION});
  }
}
