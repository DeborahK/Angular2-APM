import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { version } from "punycode";

@Injectable({
    providedIn: 'root'
})

export class ProductService{
      //private productUrl = 'api/products/products.json';
      //private productUrl = 'assets/products/products.json';
      private productUrl = 'https://localhost:6001/api';

    constructor(private http: HttpClient) {

    }

   getProducts(): Observable<IProduct[]> {
        // return this.http.get<IProduct[]>(this.productUrl + '/products' ).pipe(
        //     tap(data => console.log('All: ' + JSON.stringify(data))),
        //     catchError(this.handleError)
        // );
        return this.http.get<IProduct[]>(`${this.productUrl}/products`);
    }

    // getProducts(): Observable<IProduct[]> {
    //     return this.http.get<IProduct[]>(this.productUrl).pipe(
    //         tap(data => console.log('All: ' + JSON.stringify(data))),
    //         catchError(this.handleError)
    //     );
    // }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error ocurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}