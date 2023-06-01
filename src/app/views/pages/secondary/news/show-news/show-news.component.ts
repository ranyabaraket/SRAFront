import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsComponent } from '../news.component';

@Component({
  selector: 'app-show-news',
  templateUrl: './show-news.component.html',
  styleUrls: ['./show-news.component.scss']
})
export class ShowNewsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowNewsComponent>,
    private sanitizer: DomSanitizer,

    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  formatImg(img) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,' + img);
  }
//   styleObject(data) {
//     if (data){
//         return {height: data.photoHeight,width: this.width}
//     }
//     return {};
// }
}
