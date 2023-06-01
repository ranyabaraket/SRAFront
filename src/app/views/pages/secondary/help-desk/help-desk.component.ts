import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss']
})
export class HelpDeskComponent implements OnInit {
  menu = [
    { name: 'In Process', link: '/pages/help-desk/in-process'  },
    { name: 'Completed', link: '/pages/help-desk/completed'  }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }
  currentOnglet(link) {
    return this.router.url.indexOf(link) !== -1;
  }
}
