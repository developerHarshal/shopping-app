import { Injectable } from '@angular/core';
import { BagItem } from '../shared/models/bagItem.model';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  productList:Product[] = [];
  bagItems:BagItem[] = [];

  constructor() { }

  addProduct(product: Product) {
    this.productList.push(product);
  }

  addProductToBag(productId:number,productName:string,productPrice:number, qty:number) {
    let bagItem = this.bagItems.find(item => item.productId === productId);
    if(bagItem){
      bagItem.productQty = qty;
      bagItem.totalPrice = bagItem.productPrice * bagItem.productQty;
    }
    else {
      bagItem = this.mapToBagItem(productId,productName,productPrice,qty);
      this.bagItems.push(bagItem);
    }
  }

  removeFromBag(productId:number){
    this.bagItems = this.bagItems.filter(item => item.productId!= productId);
  }

  mapToBagItem(productId:number,productName:string,productPrice:number, qty:number): BagItem {
    let bagItem = new BagItem();
    bagItem.productId = productId;
    bagItem.productName = productName;
    bagItem.productPrice = productPrice;
    bagItem.productQty = qty;
    bagItem.totalPrice = bagItem.productPrice * bagItem.productQty;

    return bagItem;
  }

  getOrderTotal():number{
    return this.bagItems.reduce((partialSum, a) => partialSum + a.totalPrice, 0);
  }

  setQty(value: number, productId: number) {
    let bagItem = this.bagItems.find(item => item.productId === productId);
    if(bagItem){
      bagItem.productQty = value;
      bagItem.totalPrice = bagItem.productPrice * bagItem.productQty;
    }
  }
}
