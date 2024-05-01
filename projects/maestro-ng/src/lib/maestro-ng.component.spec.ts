import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroNgComponent } from './maestro-ng.component';

describe('MaestroNgComponent', () => {
  let component: MaestroNgComponent;
  let fixture: ComponentFixture<MaestroNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaestroNgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaestroNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
