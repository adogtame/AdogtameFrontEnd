import { Injectable } from "@angular/core";

import {Subject} from 'rxjs'; //10.7k (gzipped: 3.1k)

@Injectable({
    providedIn: 'root'
})
export class SpinnerService{

    isLoading$=new Subject<boolean>();

    show(): void{
        this.isLoading$.next(true);
    }

    hide(): void{
        this.isLoading$.next(false);
    }

}