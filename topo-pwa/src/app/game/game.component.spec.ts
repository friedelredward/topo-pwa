import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameComponent} from './game.component';
import {provideRouter} from "@angular/router";
import {routes} from "../app.routes";
import {LEVEL_TO_MS, LEVEL_TO_PTS, LevelSpeed} from "../shared/model/LevelSpeed";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent,
        NoopAnimationsModule,
        FormsModule,
        MatSnackBarModule

      ],
      providers: [provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.username).toBeNull();
    expect(component.isGameRunning).toBeFalse();
    expect(component.actualLvl).toEqual(LevelSpeed.LOW);
    expect(component.gameSpeedMs).toEqual(LEVEL_TO_MS[LevelSpeed.LOW]);
    expect(component.actualPoints).toEqual(0);
    expect(component.moles.length).toEqual(component.BOARD_CELLS);
    expect(component.visibleMoles).toHaveSize(0);
    expect(component['intervalId']).toBeNull();
  });

  it('should start the game', () => {
    spyOn(component, 'getNewVisibleMoles').and.callThrough();
    spyOn<any>(component, 'setNewInterval').and.callThrough();

    component.startGame();
    expect(component.isGameRunning).toBeTrue();
    expect(component.getNewVisibleMoles).toHaveBeenCalledTimes(1);
    expect(component['setNewInterval']).toHaveBeenCalledOnceWith(component.gameSpeedMs);
  });

  it('should update visibleMoles with new unique moles different from the old ones', () => {
    const oldMoles = [0, 1];
    const newMoles = [2, 3];
    spyOn<any>(component, 'getRandomMoles').and.returnValue(newMoles);

    component.getNewVisibleMoles(oldMoles);
    expect(component.visibleMoles).toEqual(newMoles);
    expect(component['getRandomMoles']).toHaveBeenCalledWith(oldMoles);
  });

  it('should stop the game', () => {
      component.stopGame();
      expect(component.isGameRunning).toBeFalse();
      expect(component.visibleMoles).toHaveSize(0);
      expect(component['intervalId']).toBeNull();
  });

  it('should stop the game clearing interval', () => {
    spyOn(window, 'clearInterval').and.callThrough();
    component['intervalId'] = 1 as unknown as number;

    component.stopGame();
    expect(component.isGameRunning).toBeFalse();
    expect(component.visibleMoles).toHaveSize(0);
    expect(window.clearInterval).toHaveBeenCalledOnceWith(component["intervalId"]);
  });

  it('should update points and show snackbar on mole hit', () => {
    component.username = "test";
    spyOn<any>(component, 'openSnackBar' );
    const initialPoints = component.actualPoints;
    component.onMoleHit(true, 1);
    expect(component.actualPoints).toEqual(initialPoints + LEVEL_TO_PTS[component.actualLvl]);
    expect(component['openSnackBar']).toHaveBeenCalledTimes(1);
  });

  it('should not update points on miss', () => {
    const initialPoints = component.actualPoints;
    component.onMoleHit(false, 1);
    expect(component.actualPoints).toEqual(initialPoints);
  });

  it('should return true when mole is visible', () => {
    component.visibleMoles = [0,1];
    expect(component.isVisibleMole(0)).toBeTrue();
    expect(component.isVisibleMole(1)).toBeTrue();
  });

  it('should return false when mole is not visible', () => {
    component.visibleMoles = [0,1];
    expect(component.isVisibleMole(2)).toBeFalse();
  });

  it('should change game speed and update actual level', () => {
    const newLevel = LevelSpeed.MEDIUM;
    component.onLvlSpeedChange(newLevel);
    expect(component.gameSpeedMs).toEqual(LEVEL_TO_MS[newLevel]);
    expect(component.actualLvl).toEqual(newLevel);
  });

  it('should update molesCount when onMolesCountChange is called', () => {
    const newMolesCount = 3;
    component.onMolesCountChange(newMolesCount);
    expect(component.molesCount).toEqual(newMolesCount);
  });

  it('should open snackbar when mole is hit', () => {
    component.username = "test";
    spyOn(component['_snackBar'], 'open');

    component.onMoleHit(true, 1);
    expect(component['_snackBar'].open).toHaveBeenCalledWith(
      `Good Job ${component.username}!`,
      "",
      { duration: component.NOTIFICATION_DURATION}
    );
  });

  it('should set a new interval and clear the old one if it exists', () => {
    const gameSpeed = 1000; // 1 second
    spyOn(window, 'setInterval').and.callThrough();
    spyOn(window, 'clearInterval');
    component['intervalId'] = setInterval(() => {
    }, 500) as unknown as number; // 0.5 second

    component['setNewInterval'](gameSpeed);

    expect(window.clearInterval).toHaveBeenCalledTimes(1);
    expect(window.setInterval).toHaveBeenCalled();
  });
});
