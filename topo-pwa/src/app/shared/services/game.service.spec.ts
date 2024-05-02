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
});
