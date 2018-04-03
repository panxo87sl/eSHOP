import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Post } from 'app/classes/post';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PanelService } from 'app/services/panel.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { isNumber } from 'util';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  htmlText;
  showText: Boolean = true;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };

  form: FormGroup;
  post;//: Array<Post>;
  editPost: Post;
  saveId: string;
  saveTitle: string;
  price: string;
  alertaTitulo: Boolean = false;
  alertaPrecio: Boolean = false;
  alertaNumero: Boolean = false;
  alertaNoticia: Boolean = false;
  alertaImagen: Boolean = false;
  constructor(public authService: AuthenticationService,private upSvc: UploadService, private links: Router, private router: ActivatedRoute, private _sanitizer: DomSanitizer, private _myCommunicationService: PanelService, fb: FormBuilder) { 
    // Subscribe to the service event
    _myCommunicationService.changeEmitted$.subscribe(myMessage => {
      this.showText = myMessage;
    });

    this.form = fb.group({
      editor: [''],
      titulo: [''],
	    precio: ['']
    });
  }
  
  ngOnInit() {
    this.router.params.subscribe((params) => {
      let id = params['id'];
      this.upSvc.getPost(id)
        .subscribe(res => {
          this.post = res;
          this.htmlText = this.post.contenido;
          this.saveId = id;
          this.saveTitle = this.post.titulo;
          this.price = this.post.precio;
          this.form.controls['titulo'].patchValue(this.saveTitle);
          this.form.controls['precio'].patchValue(this.price);
          this.form.controls['editor'].patchValue(this.htmlText);
        });
    });
  }

  goBack(): void {
    // Emit your event with message
    this._myCommunicationService.emitChange(true);
    this.links.navigate(['panel/edit_prod']);
  }

  patchValue() {
    if(this.form.controls['titulo'].value != ''){
      this.alertaTitulo = false;
      this.saveTitle = this.form.controls['titulo'].value;
    }else{
      this.alertaTitulo = true;
    }
    if(this.form.controls['precio'].value != ''){
      this.alertaPrecio = false;
      this.price = this.form.controls['precio'].value;
    }else{
      this.alertaPrecio = true;
    }
    if(+this.form.controls['precio'].value){
      //this.alertaPrecio = !this.alertaPrecio;
      this.alertaNumero = false;
      this.price = this.soloNumero(this.form.controls['precio'].value);
    }else{
      this.alertaNumero = true;
    }
    if(this.form.controls['editor'].value != ''){
      this.alertaNoticia = false;
      this.htmlText = this.form.controls['editor'].value
    }else{
      this.alertaNoticia = true;
    }
    //if(this.selectedFiles == null){
    //  this.alertaImagen = true;
    //}else{
    //  this.alertaImagen = false;
    //}
    if(this.alertaTitulo == false && this.alertaPrecio == false &&  this.alertaNumero == false && this.alertaNoticia == false){
      this.post = {titulo: this.saveTitle, precio: this.price, contenido: this.htmlText, $key:this.saveId};  
      console.log(this.post);    
      this.upSvc.updatePost(this.post)
      this._myCommunicationService.emitChange(true);
      this.reinit();
    }
  }

  reinit(): void {
    // Emit your event with message
    this.links.navigate(['/panel/edit_prod']);
  }

  soloNumero(aux: string){
    var precio: string = aux.replace('.','');
    return precio;
  }

}
