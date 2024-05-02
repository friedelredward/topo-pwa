import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getPlayerScore(player: string | null): number{
    return player ? Number(localStorage.getItem(player)): 0;
  }

  setPlayerScore(player: string | null, score: number): void{
    if(player) localStorage.setItem(player, score.toString());
  }

  deletePlayerScore(player: string): void{
    localStorage.removeItem(player);
  }

  clearScores(): void {
    localStorage.clear()
  }
}
