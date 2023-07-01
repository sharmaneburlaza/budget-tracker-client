import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user.service';

import { BalanceTrendComponent } from './balance-trend.component';

describe('BalanceTrendComponent', () => {
  let component: BalanceTrendComponent;
  let fixture: ComponentFixture<BalanceTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTrendComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
