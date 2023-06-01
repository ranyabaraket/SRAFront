import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-informations',
  templateUrl: './request-informations.component.html',
  styleUrls: ['./request-informations.component.scss']
})
export class RequestInformationsComponent implements OnInit {
  allSegments;
  allPassengers;
  @Input() data: any;
  @Input() requestModel;
  constructor() { }

  ngOnInit(): void {
  }
  selectAllSegments(event) {
    this.data.segments.forEach(element => {
      element.selected = this.allSegments;
    });
  }
  selectAllPassengers(event) {
    this.data.passengers.forEach(element => {
      element.selected = this.allPassengers;
    });
  }
  getSrcImg(codeCom) {
    return 'https://worldsoftgroup.com/airelines/' + codeCom + '.png';
  }
}
