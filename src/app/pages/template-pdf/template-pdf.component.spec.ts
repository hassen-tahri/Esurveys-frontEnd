import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePdfComponent } from './template-pdf.component';

describe('TemplatePdfComponent', () => {
  let component: TemplatePdfComponent;
  let fixture: ComponentFixture<TemplatePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
