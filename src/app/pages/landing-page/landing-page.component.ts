import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, repeat } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public _sub: Subscription = new Subscription();
  @ViewChild('section1', { static: true })
  section1!: ElementRef<HTMLDivElement>;
  @ViewChild('section2', { static: true })
  section2!: ElementRef<HTMLDivElement>;
  @ViewChild('section3', { static: true })
  section3!: ElementRef<HTMLDivElement>;
  @ViewChild('section4', { static: true })
  section4!: ElementRef<HTMLDivElement>;
  @ViewChild('section4', { static: true })
  bird1!: ElementRef<HTMLDivElement>;
  @ViewChild('bird2', { static: true })
  bird2!: ElementRef<HTMLDivElement>;
  @ViewChild('bird3', { static: true })
  bird3!: ElementRef<HTMLDivElement>;
  @ViewChild('headerText', { static: true })
  headerText!: ElementRef<HTMLImageElement>;
  @ViewChild('heroImg', { static: true })
  heroImg!: ElementRef<HTMLImageElement>;
  public screen!: string;
  public portfolios: { id: number; title: string }[] = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Website' },
    { id: 3, title: 'Mobile App' },
    { id: 4, title: 'CSS' },
    { id: 5, title: 'GitHub' },
  ];

  constructor(private router: Router, public mediaObserver: MediaObserver) {
    gsap.registerPlugin(ScrollTrigger);
    this._sub.add(
      this.mediaObserver
        .asObservable()
        .pipe(
          filter((changes: MediaChange[]) => changes.length > 0),
          map((changes: MediaChange[]) => changes[0])
        )
        .subscribe((change: MediaChange) => {
          this.screen = change.mqAlias;
        })
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this._sub.add(this.runAnimation());
  }

  public runAnimation(): void {
    this.headerAnimation();
    this.sectionAnimation();
  }

  headerAnimation() {
    gsap
      .timeline()
      .from(this.headerText.nativeElement, {
        y: -100,
        opacity: 0,
        ease: 'back',
        duration: 1,
      })
      .from(this.heroImg.nativeElement, {
        y: 100,
        opacity: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 2,
      });
  }

  public sectionAnimation() {
    let animation = {
      y: 100,
      opacity: 0,
      ease: 'back',
      delay: 0.5,
      duration: 0.6,
    };

    let animation2: any = {
      x: 100,
      opacity: 0,
      ease: 'back',
      duration: 0.6,
    };

    let sections = ['section1', 'section2', 'section3', 'section4'];

    for (let [index, section] of sections.entries()) {
      const element: any = this[section as keyof typeof this];
      const nativeElement = element.nativeElement;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: nativeElement,
          start: 'top 80%',
          end: 'top 10%',
          scrub: true,
        },
      });
      if (['xs', 'sm'].includes(this.screen)) {
        tl.from(nativeElement, animation);
      } else {
        tl.from(nativeElement.firstChild, animation).from(
          nativeElement.lastChild,
          animation2,
          '-=0.3'
        );
      }
    }
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
