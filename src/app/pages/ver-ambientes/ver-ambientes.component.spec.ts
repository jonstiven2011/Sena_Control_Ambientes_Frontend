import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAmbientesComponent } from './ver-ambientes.component';

describe('VerAmbientesComponent', () => {
  let component: VerAmbientesComponent;
  let fixture: ComponentFixture<VerAmbientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAmbientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAmbientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
