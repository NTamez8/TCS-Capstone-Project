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
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.get<Product[]>("http://localhost:8080/product/getAllProducts",{headers:{'Authorization':token}});
  };

  getProductById(product_id:any):Observable<Product[]>{
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.get<Product[]>("http://localhost:8080/product/getProductById/"+product_id,{headers:{'Authorization':token}});
  };

  addProduct(product:Product){
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<{token:string}>("http://localhost:8080/product/addProduct",{product},{headers:{'Authorization':token}});
  };

  updateProduct(product_id:String,new_quantity:Number){
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<{token:string}>("http://localhost:8080/product/updateProductQuantityById",{product_id,new_quantity},{headers:{'Authorization':token}});
  };

  deleteProductById(product_id:String){
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<{token:string}>("http://localhost:8080/product/deleteProductById",{product_id},{headers:{'Authorization':token}});
  };
}
