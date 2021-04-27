import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  currentProducts:Array<Product>=[];

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:8080/product/getAllProducts");
  }

  getProductById(product_id:String):Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:8080/product/getProductById/"+product_id);
  }

  addProduct(product:Product){
    return this.http.post<{token:string}>("http://localhost:8080/product/addProduct",{product});
  }

  updateProduct(product_id:String,new_quantity:Number){
    return this.http.post<{token:string}>("http://localhost:8080/product/updateProductQuantityById",{product_id,new_quantity});
  }

  deleteProductById(product_id:String){
    return this.http.post<{token:string}>("http://localhost:8080/product/deleteProductById",{product_id});
  }
}
