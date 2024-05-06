import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-topo',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './topo.component.html',
  styleUrl: './topo.component.scss'
})
export class TopoComponent {
  @Input() isVisible = false;
  @Output() isMoleHit = new EventEmitter<boolean>();


  onMoleHit() {
    if (!this.isVisible) return this.isMoleHit.emit(false);
    this.hitMole();
  }

  /**
   * Helper method for linter acessibility error
   */
  doNothing() {
    return;
  }

  private hitMole() {
    this.isVisible = false;
    this.isMoleHit.emit(true);
  }
}
