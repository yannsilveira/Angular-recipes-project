import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}
 
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7lRrlOBoxtJiSD-kq2CX6t7F3aCdS__8',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7lRrlOBoxtJiSD-kq2CX6t7F3aCdS__8', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too much wrong attempts, try again later!';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'The e-mail, password or both credentials are wrong!';
                break;
            case 'USER_DISABLED':
                errorMessage = 'This user was disabled, please contact the administrator user!';        
                break;
            default: 
                break;

        }
        return throwError(errorMessage);
    }
}