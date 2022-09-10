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
    console.log('productList',this.productList);
  }

  addProductToBag(productId:number,productName:string,productPrice:number, qty:number) {
    // this.bagItems.push(bagItem);
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

  getDefaultProduct(): Product{
    return {
      "productId": 123,
      "productName": "Kulfi",
      "productPrice": 12,
      "productImage": {} as File,
      "productImageUrl": "data:image/jpeg;base64,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"
  }
  }
}
