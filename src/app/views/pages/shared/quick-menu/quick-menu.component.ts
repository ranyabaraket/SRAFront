import { Component, OnInit } from '@angular/core';
import { QuickMenuService } from './quick-menu.service';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-quick-menu',
  templateUrl: './quick-menu.component.html',
  styleUrls: ['./quick-menu.component.scss']
})
export class QuickMenuComponent implements OnInit {
  menu;
  constructor(private quickMenuService: QuickMenuService,
              private cookie: CookieService, ) { }

  ngOnInit() {
    this.quickMenuService.getModules().subscribe(
      data => {
        this.menu = data;
      }
    );
  }

}
