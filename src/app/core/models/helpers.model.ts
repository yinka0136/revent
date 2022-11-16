import { ElementRef } from '@angular/core';

export class Helpers {
  public static STORAGE_TAG = 'ds_int';
  public static TOKEN_TAG = 'filetra_token';
  public static DS_INT_TIMEOUT = 'ds_int_timeout';
  public static SIGNUP_DATA_TAG = 'ds_int_signup_data';
  public static NETWORK_SUCCESS = 'Successful';
  public static VERIFY_EMAIL_DETAIL = 'ds_int_verify_email';
  public static ERR_VERIFY_EMAIL = 'verify-email';
  public static ERR_TOKEN_EXPIRED = 'token-expired';
  public static ERR_INPUT_SUB_TOKEN = 'input_token';
  public static MIN_AG = 'ds_ministries';

  public static file_types_urls = {
    'application/pdf': 'assets/img/ic_pdf.png',
    'application/msword': 'assets/img/ic_word.png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'assets/img/ic_word.png',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'assets/img/ic_ppt.png',
  };

  public static getConfidentialityLevelText(level: ConfidentialLevel) {
    switch (level) {
      case ConfidentialLevel.UnClassified:
        return 'UnClassified';
      case ConfidentialLevel.Secret:
        return 'Secret';
      case ConfidentialLevel.Confidential:
        return 'Confidential';
      case ConfidentialLevel.TopSecret:
        return 'Top Secret';
      default:
        return 'UnClassified';
    }
  }

  // public static getInternalDocumentTypesMap(){
  //     var int_doc_types: Map<string, number> = new Map();
  //     int_doc_types.set("memo", InternalDocumentType.Memo);
  //     int_doc_types.set("minute", InternalDocumentType.Minute);
  //     int_doc_types.set("circular", InternalDocumentType.Circular);
  //     return int_doc_types;
  // }

  public static playNotificationSound(ref: ElementRef) {
    // let audio = new Audio();
    // audio.src = "../../../assets/audio/noti.mp3";
    // audio.load();
    // setTimeout(() => {
    //     audio.play();
    // }, 200);
    ref.nativeElement.play();
  }

  // public static formatUnicorn(format: string, ...argts): string {

  //     var str = format
  //     if (argts.length) {
  //         var t = typeof argts[0];
  //         var key;
  //         var args = ("string" === t || "number" === t) ?
  //             Array.prototype.slice.call(argts)
  //             : argts[0];

  //         for (key in args) {
  //             str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
  //         }
  //     }

  //     return str;
  // };
}
enum ConfidentialLevel {
  UnClassified = 1,
  Confidential = 2,
  Secret = 3,
  TopSecret = 4,
}
