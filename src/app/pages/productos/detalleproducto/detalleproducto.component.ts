import { Component, OnInit } from '@angular/core';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalleproducto',
  templateUrl: './detalleproducto.component.html',
  styleUrls: ['./detalleproducto.component.scss']
})
export class DetalleproductoComponent implements OnInit {
  htmlDescripcion: string;
  showText: Boolean = true;
  post;
  saveId: string;
  price: string;
  saveTitle: string;
  imagen: string;
  constructor(private upSvc: UploadService, private links: Router, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      let id = params['id'];
      this.upSvc.getPost(id)
        .subscribe(res => {
          this.post = res;
          console.log(this.post);
          this.htmlDescripcion = this.post.contenido;
          this.saveId = id;
          this.saveTitle = this.post.titulo;
          this.price = this.post.precio;
          this.imagen = this.post.url;          
        });
    });
  }

  irNoticias(){
    this.links.navigate(['/producto']);
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
