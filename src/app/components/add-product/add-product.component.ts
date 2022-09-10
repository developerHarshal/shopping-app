import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File;
  selectedFileUrl: string;
  fileSizeError = false;
  fileTouched = false;
  fileNotSelectedError = false;

  url="";
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.productForm = new FormGroup({
      productName: new FormControl('',Validators.required),
      productPrice: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      // productImage: new FormControl(''),
    });
  }

  goBack(){
    this.router.navigate(['./dashboard']);
  }

  getIsRequired(controlName: string) {
    let control = this.productForm.get(controlName);
    if(control.invalid && (control.dirty || control.touched)){
    return control.errors?.['required'];
    }
    return false;
  }

  getIsPatternError(){
    let control = this.productForm.get('productPrice');
    if(control.invalid && (control.dirty || control.touched)){
    return control.errors?.['pattern'];
    }
  }

  onSubmit(){
    console.log(this.productForm.value);
    const product = this.mapToProduct();
    this.productService.addProduct(product);
    this.router.navigate(['./dashboard']);
  }

  onFileSelected(event) {
    this.fileTouched = true;
    this.selectedFile = event.target.files[0];
    console.log(event);
    if(this.selectedFile){
      this.fileNotSelectedError = false;
      console.log(this.selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event:any)=> {
        this.url = event.target.result;
        this.selectedFileUrl = this.url;
      }

    if(this.selectedFile.size > 200000){
      this.fileSizeError = true;
    } 
    else{
      this.fileSizeError = false;
    }
    }
    else{
      this.fileNotSelectedError = true;
    }
}

checkIsSubmitDisabled(){
  return this.fileNotSelectedError || this.fileSizeError || this.productForm.invalid || !this.fileTouched;
}
mapToProduct(): Product {
  let product = new Product();
  const formValue = this.productForm.value;

  product.productName = formValue.productName;
  product.productPrice = +formValue.productPrice;
  product.productImage = this.selectedFile;
  product.productImageUrl = this.selectedFileUrl;
  product.productId = this.getRandomId();

  return product;
}

getRandomId():number {
  return Math.floor((Math.random()*1000000)+1);
}

}


