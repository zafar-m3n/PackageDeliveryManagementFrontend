import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatePackageComponent } from './translate-package.component';

describe('TranslatePackageComponent', () => {
  let component: TranslatePackageComponent;
  let fixture: ComponentFixture<TranslatePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatePackageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslatePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
