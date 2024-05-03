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
    expect(component.visibleMole).toBeUndefined();
    expect(component['intervalId']).toBeNull();
  });

  it('should start the game', () => {
    spyOn(component, 'getNewVisibleMole').and.callThrough();
    spyOn<any>(component, 'setNewInterval').and.callThrough();

    component.startGame();
    expect(component.isGameRunning).toBeTrue();
    expect(component.getNewVisibleMole).toHaveBeenCalledTimes(1);
    expect(component['setNewInterval']).toHaveBeenCalledOnceWith(component.gameSpeedMs);
  });

  it('should Set new visible mole different from undefined', () => {
    const dummyMole= 0;
    spyOn<any>(component, 'getRandomMole').and.returnValue(dummyMole + 1);

    component.getNewVisibleMole();
    expect(component.visibleMole).toEqual(dummyMole + 1);
    expect(component['getRandomMole']).toHaveBeenCalledOnceWith(undefined);
  });

  it('should Set new visible mole different from 0', () => {
    const dummyMole= 0;
    spyOn<any>(component, 'getRandomMole').and.returnValue(dummyMole + 1);

    component.getNewVisibleMole(dummyMole);
    expect(component.visibleMole).toEqual(dummyMole + 1);
    expect(component['getRandomMole']).toHaveBeenCalledOnceWith(dummyMole);
  });

  it('should Set new visible mole different from any', () => {
    const dummyMole= 1;
    spyOn<any>(component, 'getRandomMole').and.callThrough();

    component.getNewVisibleMole(dummyMole);
    expect(component.visibleMole).not.toEqual(dummyMole );
    expect(component['getRandomMole']).toHaveBeenCalled();
  });

  it('should stop the game', () => {
      component.stopGame();
      expect(component.isGameRunning).toBeFalse();
      expect(component.visibleMole).toBeUndefined();
      expect(component['intervalId']).toBeNull();
  });

  it('should update points and show snackbar on mole hit', () => {
    component.username = "test";
    spyOn<any>(component, 'openSnackBar' );
    const initialPoints = component.actualPoints;
    component.onMoleHit(true);
    expect(component.actualPoints).toEqual(initialPoints + LEVEL_TO_PTS[component.actualLvl]);
    expect(component['openSnackBar']).toHaveBeenCalledTimes(1);
  });

  it('should not update points on miss', () => {
    const initialPoints = component.actualPoints;
    component.onMoleHit(false);
    expect(component.actualPoints).toEqual(initialPoints);
  });

  it('should return true when mole is visible', () => {
    component.visibleMole = 0;
    expect(component.isVisibleMole(0)).toBeTrue();
  });

  it('should return false when mole is not visible', () => {
    component.visibleMole = 1;
    expect(component.isVisibleMole(0)).toBeFalse();
  });

  it('should change game speed and update actual level', () => {
    const newLevel = LevelSpeed.MEDIUM;
    component.onLvlSpeedChange(newLevel);
    expect(component.gameSpeedMs).toEqual(LEVEL_TO_MS[newLevel]);
    expect(component.actualLvl).toEqual(newLevel);
  });
});
