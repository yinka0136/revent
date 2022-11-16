import {
  InitialLandingCount,
  LandingCount,
} from './../../../shared/models/shared.model';
import { SettingsService } from './../../../shared/services/settings.service';
import { CurrentUserService } from '@core/services/current-user.service';
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
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Base } from '@core/base/base-component';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';
import { ResponseModel } from '@core/models/response.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent
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
  @ViewChild('headerText', { static: true })
  headerText!: ElementRef<HTMLImageElement>;
  @ViewChild('heroImg', { static: true })
  heroImg!: ElementRef<HTMLImageElement>;

  @ViewChild('counters', { static: true })
  counters!: ElementRef<HTMLDivElement>;
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
  public isGettingCount: boolean = false;
  public landingCount: LandingCount = InitialLandingCount;

  constructor(
    private router: Router,
    public mediaObserver: MediaObserver,
    private _current: CurrentUserService,
    injector: Injector,
    _clipboard: Clipboard,
    private _setting: SettingsService,
    private _base: Base
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
    this.guest = !_current.getCurrentUser();
    if (this.guest) {
      // this.currentUserService.clearStorage();
    }
  }

  ngOnInit(): void {
    this.getLandingCount();
    // (window as any).Intercom('update');
    // (this.password.value);
  }

  ngAfterViewInit() {
    this.addSubscription(this.runAnimation());
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  public getLandingCount(): void {
    this.isGettingCount = true;
    this._base.addSubscription(
      this._setting.getLandingCount().subscribe({
        next: (res: ResponseModel<LandingCount>) => {
          this.isGettingCount = false;
          this.landingCount = res?.data;
        },
        error: () => {
          this.isGettingCount = false;
        },
      })
    );
  }

  public runAnimation(): void {
    this.loading = false;
    this.headerAnimation();
    this.animateDrugs();
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
        duration: 1,
      })
      .from(
        this.counters.nativeElement.childNodes,
        {
          scale: 0,
          ease: 'elastic.out(1, 0.3)',
          stagger: {
            amount: 0.8,
          },
        },
        '<'
      );
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
