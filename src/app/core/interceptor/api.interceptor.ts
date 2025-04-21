import { 
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ApiInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const excludedUrl = ['/auth']
        if(excludedUrl.some(url=> req.url.includes(url))){
            return next.handle(req)
        }
        const token = localStorage.getItem('accessToken')
        if(token){
            const cloned = req.clone({setHeaders:{
                Authorization: `Bearer ${token}`
            }})
            // console.log
            return next.handle(cloned);
        }
        return next.handle(req);
    }
}