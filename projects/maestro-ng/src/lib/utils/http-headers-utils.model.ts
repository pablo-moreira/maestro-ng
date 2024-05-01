import { HttpHeaders } from '@angular/common/http';

export class HttpHeadersUtils {

  public static contentTypeJson(): HttpHeaders {
    return new HttpHeaders({'Content-Type': 'application/json'});
  }

}
