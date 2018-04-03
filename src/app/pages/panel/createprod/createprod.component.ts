import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanelService } from "app/services/panel.service";
import { ContactService } from "app/services/contact.service";
import { Upload } from 'app/services/uploads/shared/upload';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { isNumber } from 'util';

@Component({
  selector: 'app-createprod',
  templateUrl: './createprod.component.html',
  styleUrls: ['./createprod.component.scss']
})
export class CreateprodComponent implements OnInit {
  currentUpload: Upload;
  
  showText: Boolean = true;
  alertaTitulo: Boolean = false;
  alertaPrecio: Boolean = false;
  alertaNumero: Boolean = false;
  alertaNoticia: Boolean = false;
  alertaImagen: Boolean = false;
  Title: String = '';
  Price: String = '';
  Descripcion: String = '';
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };

  form: FormGroup;
  post: any = {};
  selectedFiles: FileList|null;

  constructor(public authService: AuthenticationService,private upSvc: UploadService,private router: Router, private _myCommunicationService: PanelService, fb: FormBuilder, private _contactService: ContactService) {

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
  //@ViewChild('editor') editor: QuillEditorComponent
  ngOnInit() {
    //this.form.controls['editor'].patchValue(`<p><span style="color: rgb(102, 185, 102);">asdasd</span></p>`)
    this.showText = !this.showText;
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  patchValue() {
   //console.log(this.form.controls['editor'].value);
    if(this.form.controls['titulo'].value != ''){
      //this.alertaTitulo = !this.alertaTitulo;
      this.alertaTitulo = false;
    }else{
      this.alertaTitulo = true;
    }
    if(this.form.controls['precio'].value != ''){
      //this.alertaPrecio = !this.alertaPrecio;
      this.alertaPrecio = false;
    }else{
      this.alertaPrecio = true;
    }
    if(+this.form.controls['precio'].value){
      //this.alertaPrecio = !this.alertaPrecio;
      this.alertaNumero = false;
    }else{
      this.alertaNumero = true;
    }
    if(this.form.controls['editor'].value != ''){
      //this.alertaNoticia = !this.alertaNoticia;
      this.alertaNoticia = false;
    }else{
      this.alertaNoticia = true;
    }
    if(this.selectedFiles == null){
      this.alertaImagen = true;
    }else{
      this.alertaImagen = false;
    }
    if(this.alertaTitulo == false && this.alertaPrecio == false && this.alertaNumero == false && this.alertaNoticia == false && this.selectedFiles != null){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!    
      var yyyy = today.getFullYear();
      var hh = today.getHours();
      var min = today.getMinutes();
      var mil = today.getSeconds();
      var fecha = dd+'/'+mm+'/'+yyyy+' '+hh+':'+min+':'+mil;

      this.Title = this.form.controls['titulo'].value;
      this.Price = this.soloNumero(this.form.controls['precio'].value);
      this.Descripcion = this.form.controls['editor'].value;

      this.post = { titulo: this.Title, precio: this.Price, contenido: this.Descripcion, file : this.selectedFiles.item(0),fecha: fecha};
      
    this.upSvc.pushUpload(this.post)
    this._myCommunicationService.emitChange(true);
    this.goBack();
    }
  }
  
  createPost() {
    this.showText = !this.showText;
    this.router.navigateByUrl('/panel/create_prod');
  }

  goBack(): void {
    // Emit your event with message
    this._myCommunicationService.emitChange(true);
    this.router.navigate(['/panel']);

  }

  soloNumero(aux: string){
    var precio: string = aux.replace('.','');
    return precio;
  }
  
  logChange($event: any) {
    console.log($event);
  }
}