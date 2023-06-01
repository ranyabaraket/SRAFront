import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss']
})
export class VisaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextStep(model) {
    this.router.navigate(['/pages/visa/details'], {
      state: {
        model
      }
    });

  }

}
