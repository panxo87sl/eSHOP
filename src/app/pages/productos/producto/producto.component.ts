import { Component, OnInit } from '@angular/core';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { Post } from 'app/classes/post';
import { Router } from '@angular/router';
import { PagerService } from 'app/services/pager.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  uploadsObservable: Array<Post>;
  posts;
  keys: string[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  constructor(private upSvc: UploadService,private router: Router, private pagerService: PagerService) { }

  ngOnInit() {
    //this.upSvc.getUploadsLimit().subscribe(res => {
    //  this.uploadsObservable = res.reverse();
    //});
    this.upSvc.getUploads()
    .subscribe(res => {
     this.posts = res;    
      this.keys = Object.keys(this.posts).reverse();
      this.setPage(1);   
    });
  }

  irNoticia(id){
    this.router.navigate(['/detalle-producto/'+id]);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    //this.pager = this.pagerService.getPager(this.posts.length, page);
    this.pager = this.pagerService.getPager(this.keys.length, page);

    // get current page of items
    //this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pagedItems = this.keys.slice(this.pager.startIndex, this.pager.endIndex +1);;
  }

  formatoPesos(aux: string){
    var cifra:number = aux.length;
    var i:number;
    var cont:number = 0;
    var precio:string='';
    for (i = cifra-1; i>=0 ;i--){
      if (cont == 3){
        precio = aux[i] +'.' + precio;
        cont = 0;
      }else{
        precio = aux[i]+precio;
      }
      cont++;
      console.log("1cifra: " + cifra);
      console.log("2precio: " + precio);
      console.log("3i: " + i);
    }
    precio = '$'+precio;
    return precio;
  }

}
