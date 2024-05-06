import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TopoComponent} from './topo.component';

describe('TopoComponent', () => {
  let component: TopoComponent;
  let fixture: ComponentFixture<TopoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit isMoleHit event with false when mole is not visible', () => {
    spyOn(component.isMoleHit, 'emit');
    component.isVisible = false;
    component.onMoleHit();
    expect(component.isMoleHit.emit).toHaveBeenCalledWith(false);
  });

  it('should emit isMoleHit event with true when mole is hit', () => {
    spyOn(component.isMoleHit, 'emit');
    component.isVisible = true;
    component.onMoleHit();
    expect(component.isMoleHit.emit).toHaveBeenCalledWith(true);
  });

  it('should set isVisible to false and emit isMoleHit event with true when mole is hit', () => {
    spyOn(component.isMoleHit, 'emit');
    component.isVisible = true;
    component['hitMole']();
    expect(component.isVisible).toBeFalse();
    expect(component.isMoleHit.emit).toHaveBeenCalledWith(true);
  });

  it('should not emit isMoleHit event when doNothing is called', () => {
    spyOn(component.isMoleHit, 'emit');
    component.doNothing();
    expect(component.isMoleHit.emit).not.toHaveBeenCalled();
  });

});
