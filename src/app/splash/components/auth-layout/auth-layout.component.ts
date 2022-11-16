import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  public images: string[] = [
    'assets/landing/img/girl.svg',
    'assets/landing/img/doc.svg',
    'assets/landing/img/standing.svg',
    'assets/landing/img/man.svg',
  ];
  constructor() {}

  ngOnInit(): void {
    // setInterval(() => {
    //   this.shuffleImages();
    // }, 4000);
  }

  public shuffleImages() {
    let currentIndex = this.images.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.images[currentIndex], this.images[randomIndex]] = [
        this.images[randomIndex],
        this.images[currentIndex],
      ];
    }
  }
}
