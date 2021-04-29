import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductMessage } from 'src/app/Classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  // we need both to be Arrays because of how Observables are returned from the HttpClient
  currentProduct:Array<Product>=[];
  currentProducts:Array<Product>=[];

  // a general function to test for Product existence based on the ID
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

  // get all Products
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:8080/product/getAllProducts");
  }

  // get a Product based off of its ID
  getProductById(product_id:String):Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:8080/product/getProductById/"+product_id);
  }

  // add a new Product
  addProduct(product:Product){
    // sending Admin validation to backend
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<{token:string}>("http://localhost:8080/product/addProduct",{product},{headers:{'Authorization':token}});
  };

  // update a Product
  updateProduct(product_id:String,new_quantity:Number):Observable<ProductMessage>{
    // sending Admin validation to backend
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<ProductMessage>("http://localhost:8080/product/updateProductQuantityById",{product_id,new_quantity},{headers:{'Authorization':token}});
  };

  // delete a Product
  deleteProductById(product_id:String){
    // sending Admin validation to backend
    let token = 'bearer ' + sessionStorage.getItem('adminToken');
    return this.http.post<ProductMessage>("http://localhost:8080/product/deleteProductById",{product_id},{headers:{'Authorization':token}});
  };
}
