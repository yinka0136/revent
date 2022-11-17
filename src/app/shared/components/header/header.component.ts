import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Fragments } from 'app/models/fragment.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public screen!: string;

  @Input() scrolled!: boolean;
  @ViewChild('header') header!: ElementRef<HTMLDivElement>;
  public showSideNav = false;
  public fragments = Fragments;
  public activeFragment: string = 'Home';
  constructor(
    public mediaObserver: MediaObserver,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: any) => {
      if (fragment) {
        this.activeFragment = fragment;
      }
    });
  }

  /**
   * Toggle the visibility of the side-nav.
   */
  public toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  public stopBubbling(event: any): void {
    event.stopPropagation();
  }

  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}
