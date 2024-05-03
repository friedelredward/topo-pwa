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

export enum LevelSpeed{
  LOW= "LOW",
  MEDIUM= "MEDIUM",
  HIGH= "HIGH"
}
export const LEVEL_TO_MS ={
  LOW: 2000,
  MEDIUM: 750,
  HIGH: 500
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
  isGameRunning= false;
  actualLvl= LevelSpeed.LOW;
  gameSpeedMs: number= LEVEL_TO_MS[this.actualLvl];
  actualPoints: number= 0;
  moles= new Array(this.BOARD_CELLS).fill(0).map((x,i)=> i);
  visibleMole: number| undefined;
  private intervalId: number | null= null;

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
  }

  stopGame(): void {
    this.isGameRunning= false;
    if (this.intervalId) clearInterval(this.intervalId);
    this.visibleMole= undefined;
  }

  startGame(): void {
    this.isGameRunning=true;
    this.getNewVisibleMole(this.visibleMole);
    this.setNewInterval(this.gameSpeedMs)
  }

  onMoleHit(isMoleHit: boolean, moleIndex: number){
    if (isMoleHit){
      this.openSnackBar();
      this.getNewVisibleMole(moleIndex);
    }
    this.updatePoints(isMoleHit);
  }

  /**
   * On level change handler.
   * Also updates game speed.
   * @param event
   */
  onLvlSpeedChange(event: LevelSpeed) {
   this.gameSpeedMs= LEVEL_TO_MS[event];
   console.log("lvl speed change");
   //reset intervals
    if(this.isGameRunning) this.setNewInterval(this.gameSpeedMs);
  }


  /**
   * Set new visible mole different from actual.
   * */
  getNewVisibleMole(moleIndex?: number): void{
    const newMole= this.getRandomMole(moleIndex);
    this.visibleMole = newMole;
  }

  isVisibleMole= (moleIndex: number): boolean=>  this.visibleMole === moleIndex;

  ngOnDestroy(): void {
    console.log("destroying..., linter warning avoid.");
    if (this.intervalId) clearInterval(this.intervalId);
  }

  /**
   * Gets new distinct random value
   * @param oldRandom
   * @private
   */
  private getRandomMole(oldRandom?: number): number{
    const random=Math.floor(Math.random() * this.moles.length);
    if ( oldRandom !== random){
      return random;
    }
    console.log("Getting new random mole because duplicate. OLD:", oldRandom);
    return this.getRandomMole(random);
  }

  private updatePoints(isMoleHit: boolean): void {
    if (!isMoleHit) return; //do nothing
    this.actualPoints= this.actualPoints + LEVEL_TO_PTS[this.actualLvl];
    this.gameService.setPlayerScore(this.username, this.actualPoints);
  }

  private setNewInterval(gameSpeed: number) {
    console.log("Setting new interval", this.intervalId);
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId= setInterval( ()=>{
      console.log("Getting new mole IF timer expired or mole is hit")
      this.getNewVisibleMole(this.visibleMole);
    }, gameSpeed) as number;
  }
  private openSnackBar() {
    this._snackBar.open("Good Job!", "", { duration: this.NOTIFICATION_DURATION});
  }
}
