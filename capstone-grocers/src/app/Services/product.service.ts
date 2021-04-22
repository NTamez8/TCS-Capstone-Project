import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts(){

  }

  getProductById(){
    
  }

  addProduct(product:Product){

  }

  updateProduct(p_name:String,p_newQuantity:Number){
    
  }

  deleteProduct(p_name:String){

  }
}
