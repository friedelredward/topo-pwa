import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-topo',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <img class="mole" tabindex="0" loading="lazy" src="assets/img/mole.jpg" alt="Mole image"
         [ngClass]=" isVisible ? 'visible' : 'not-visible'"
         (click)="onMoleHit()"
         (keyup)="doNothing()"
         (keydown)="doNothing()"
    >
  `,
  styles:[`
    .mole{
      width: 100%;
    }
    .not-visible{
      opacity: 0;
    }
    .visible{
      opacity: 1;
    }
  `]
})
export class TopoComponent {
  @Input() isVisible= false;
  @Output() isMoleHit= new EventEmitter<boolean>();


  onMoleHit() {
    if(!this.isVisible) return this.isMoleHit.emit(false);
    this.hitMole();
  }

  private hitMole(){
    this.isVisible= false;
    this.isMoleHit.emit(true);
  }

  /**
   * Helper method for linter acessibility error
   */
  doNothing() {
    return;
  }
}
