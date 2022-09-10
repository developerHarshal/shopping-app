import { Component, ElementRef, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {

  }

  addToBag(productId:number,productName:string,productPrice:number, qty:number){
    this.productService.addProductToBag(productId,productName,productPrice,qty);
  }

  reduceQty(i:number, productId:number){
    var element = document.getElementById(`qty_${i}`); 
    var currentValue= +element.getAttribute('value');
    let value;
    if(currentValue>0){
      value = currentValue-1;
    }
    else{
      value = 0;
    }

    element.setAttribute('value', `${value}`);
    this.productService.setQty(value,productId);
  }

  increaseQty(i:number, productId:number){
    var element = document.getElementById(`qty_${i}`); 
    var currentValue= +element.getAttribute('value');
    currentValue +=1;
      element.setAttribute('value', `${currentValue}`);

      this.productService.setQty(currentValue,productId);
  }
}
