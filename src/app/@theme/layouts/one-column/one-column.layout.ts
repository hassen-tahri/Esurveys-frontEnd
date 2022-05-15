import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" (mouseover)="expandSidebar()" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column (mouseover)="compactSidebar()">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  constructor(private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
   ) {}
   
   expandSidebar(): boolean {
    this.sidebarService.expand('menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }



  compactSidebar(): boolean {
    this.sidebarService.collapse('menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }
}
