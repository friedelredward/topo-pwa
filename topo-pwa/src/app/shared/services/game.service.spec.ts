import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule
      ]
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return player score from localStorage', () => {
    const playerName = 'testPlayer';
    const testScore = 100;
    localStorage.setItem(playerName, testScore.toString());
    const score = service.getPlayerScore(playerName);
    expect(score).toEqual(testScore);
  });

  it('should return 0 if player score is not found', () => {
    const playerName = 'nonExistingPlayer';
    const score = service.getPlayerScore(playerName);
    expect(score).toEqual(0);
  });

  it('should set player score in localStorage', () => {
    const playerName = 'testPlayer';
    const testScore = 100;
    service.setPlayerScore(playerName, testScore);
    const score = localStorage.getItem(playerName);
    expect(score).toEqual(testScore.toString());
  });

  it('should delete player score from localStorage', () => {
    const playerName = 'testPlayer';
    const testScore = 100;
    localStorage.setItem(playerName, testScore.toString());
    service.deletePlayerScore(playerName);
    const score = localStorage.getItem(playerName);
    expect(score).toBeNull();
  });

  it('should clear all scores from localStorage', () => {
    localStorage.setItem('player1', '100');
    localStorage.setItem('player2', '200');
    service.clearScores();
    expect(localStorage.length).toEqual(0);
  });
});
