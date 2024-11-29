import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderAdminComponent } from './detail-order-admin.component';

describe('DetailOrderAdminComponent', () => {
  let component: DetailOrderAdminComponent;
  let fixture: ComponentFixture<DetailOrderAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailOrderAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOrderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
