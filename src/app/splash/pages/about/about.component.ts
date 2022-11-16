import {
  AfterViewInit,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Base } from '@core/base/base-component';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent
  extends Base
  implements OnInit, AfterViewInit, OnDestroy
{
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

  emailstring =
    'mailto:customercare@lawpavilion.com?subject=Schedule%20A%20Demo&body=I%20would%20like%20to%20schedule%20a%20demo%20for%20the%20Primsol%20product.';

  public mode: BehaviorSubject<any> = new BehaviorSubject('emailMode');
  email: BehaviorSubject<string> = new BehaviorSubject('');
  password: BehaviorSubject<string> = new BehaviorSubject('');
  primsolId: BehaviorSubject<string> = new BehaviorSubject('');
  lpStoreUrl = 'register';
  public guest!: boolean;
  public screen!: string;
  public loading = true;

  constructor(
    private router: Router,
    public mediaObserver: MediaObserver,
    injector: Injector,
    _clipboard: Clipboard
  ) {
    super(injector, _clipboard);
    gsap.registerPlugin(ScrollTrigger);
    this.addSubscription(
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
    // this.guest = !currentUserService.getCurrentUser();
    if (this.guest) {
      // this.currentUserService.clearStorage();
    }
  }

  ngOnInit(): void {
    // (window as any).Intercom('update');
    // (this.password.value);
  }

  ngAfterViewInit() {
    this.addSubscription(this.runAnimation());
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public runAnimation(): void {
    this.loading = false;
    // this.headerAnimation();
    this.sectionAnimation();
  }

  // headerAnimation() {
  //   gsap
  //     .timeline()
  //     .from(this.heroFirstColumn.nativeElement, {
  //       y: 100,
  //       opacity: 0,
  //       ease: 'back',
  //       duration: 1,
  //       delay: 0.5,
  //     })
  //     .from(this.heroImg.nativeElement, {
  //       scale: 0,
  //       ease: 'elastic.out(1, 0.3)',
  //       duration: 0.5,
  //     })
  //     .from(
  //       this.emojiFeatures.nativeElement.childNodes,
  //       {
  //         scale: 0,
  //         ease: 'elastic.out(1, 0.3)',
  //         stagger: {
  //           amount: 0.8,
  //         },
  //       },
  //       '<'
  //     )
  //     .from(this.heroImgConnector.nativeElement, { opacity: 0 }, '-=0.5');
  // }

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

  public animateDrugs(): void {
    let data = document.getElementsByClassName('pill');
    let randomTime = gsap.utils.random(1, 5, true);

    var dx = window.innerWidth * 0.35;
    var dy = window.innerHeight * 0.35;

    var randomX = gsap.utils.random(-dx, dx, true);
    var randomY = gsap.utils.random(-dy, dy, true);

    gsap.set(data, { scale: 1 });

    var tl = gsap.timeline({
      repeat: -1,
      repeatRefresh: true,
    });

    tl.to(data, {
      duration: randomTime,
      x: randomX,
      y: randomY,
    });
  }

  public checkForKeyEnter(event: KeyboardEvent): void {
    var key = event.key || event.keyCode;
    if (key == 'Enter' || key == 8) {
      // this.login();
    }
  }
  ngOnDestroy(): void {
    this.clearSubscription();
  }
}
