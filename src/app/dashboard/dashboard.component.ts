import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Record } from '../shared/models/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  records: Record[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {}
}
