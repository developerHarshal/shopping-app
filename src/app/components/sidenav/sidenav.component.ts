import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SideNavTabs } from 'src/app/shared/enum/SideNavTabs.enum';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  currentTab$:BehaviorSubject<number>;
  dashboard = SideNavTabs.dashboard;
  timesheet = SideNavTabs.timesheet;
  proj = SideNavTabs.proj;
  constructor() { }

  ngOnInit(): void {
    this.currentTab$ = new BehaviorSubject<number>(SideNavTabs.dashboard);
  }

  isActive(tab:number) : boolean{
    return this.currentTab$.getValue() === tab;
  }

}
