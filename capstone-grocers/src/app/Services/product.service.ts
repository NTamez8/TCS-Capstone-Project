import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductMessage } from 'src/app/Classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  currentProduct:Array<Product>=[];
  currentProducts:Array<Product>=[];

  productExists(product_id:String):Boolean{
    if(product_id){
      let productExists = false;
      this.currentProducts.forEach(function(product){
        if(product._id == product_id){
          productExists =  true;
        }
      });
      return productExists;
    }else{
      return false;
    }
  };

  getAllProducts():Observable<Product[]>{
   // let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.get<Product[]>("http://localhost:8080/product/getAllProducts");
  }

  getProductById(product_id:String):Observable<Product[]>{
   // let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.get<Product[]>("http://localhost:8080/product/getProductById/"+product_id);
  }

  addProduct(product:Product){
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<{token:string}>("http://localhost:8080/product/addProduct",{product},{headers:{'Authorization':token}});
  };

  updateProduct(product_id:String,new_quantity:Number):Observable<ProductMessage>{
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<ProductMessage>("http://localhost:8080/product/updateProductQuantityById",{product_id,new_quantity},{headers:{'Authorization':token}});
  };

  deleteProductById(product_id:String){
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<ProductMessage>("http://localhost:8080/product/deleteProductById",{product_id},{headers:{'Authorization':token}});
  };
}
