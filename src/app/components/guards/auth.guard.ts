import { inject, Injectable } from "@angular/core";
import { TokenService } from "../../services/token.service";
import { CanActivateFn, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ){}
    canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        const isTokenExpired = this.tokenService.isTokenExpired();
        const isUserIdValid = this.tokenService.getUserId() > 0;
        debugger
        if(!isTokenExpired && isUserIdValid){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}
export const AuthGuardFn: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean => {
    debugger
    return inject(AuthGuard).canActive(next,state);
}