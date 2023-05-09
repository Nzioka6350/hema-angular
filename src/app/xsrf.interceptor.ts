import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class XSRFInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        if (!req.headers.has('X-XSRF-TOKEN')) {
                // Get the xsrf cookie value if exists.
                const token = this.getToken()
                if (token) {
                const authReq = req.clone({
                    headers: req.headers.set('X-XSRF-TOKEN', `${token}`)
                });
                // send cloned request with header to the next handler.
                return next.handle(authReq);
            }
        }
        return next.handle(req);
    }

    getToken()  {
        let cookie_string = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]
        return cookie_string?cookie_string:'';
    }
}