import {Component, OnInit, Input} from '@angular/core';
import { AdminMenuItems, MenuItems, MenuLayouts } from '../../constants/menu-items';
import { IMenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() layout: string = '';

  menuItems: IMenuItem[] = [];
  isAdminLayout = false;

  constructor() { }

  ngOnInit(): void {
    this.isAdminLayout = this.layout === MenuLayouts.ADMIN;
    this.menuItems = this.isAdminLayout ? AdminMenuItems : MenuItems;
  }

}
