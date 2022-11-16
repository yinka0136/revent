import { LocalStorageService } from '@shared/services/local-storage.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Base } from '@core/base/base-component';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss'],
})
export class KeyComponent implements OnInit {
  @Output() requestAccessKey: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() key!: string;
  @Input() error_message!: string;
  @Input() isLoading: boolean = false;
  public showAccessKey: boolean = false;
  constructor(
    private _base: Base,
    private _localStorageAs: LocalStorageService
  ) {
    _localStorageAs.watch('accessToken').subscribe((res: string) => {
      if (res) {
        this.key = JSON.parse(res);
      }
    });
  }

  ngOnInit(): void {}

  public copyToClipboard(): void {
    this._base.copyToClipboard(this.key);
  }
}
