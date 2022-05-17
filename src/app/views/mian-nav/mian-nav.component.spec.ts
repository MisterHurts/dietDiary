import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MianNavComponent } from './mian-nav.component';

describe('MianNavComponent', () => {
  let component: MianNavComponent;
  let fixture: ComponentFixture<MianNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MianNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MianNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
