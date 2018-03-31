import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { NewsComponent } from './pages/news/news.component';
import { PanelComponent } from './pages/panel/panel.component';
import { CreateprodComponent } from './pages/panel/createprod/createprod.component';
import { EditprodComponent } from './pages/panel/editprod/editprod.component';
import { ContactService } from 'app/services/contact.service';
import { PanelService } from 'app/services/panel.service';
import { TinymceModule } from 'angular2-tinymce';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AngularFireModule} from 'angularfire2';
import { UploadService } from 'app/services/uploads/shared/upload.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'environments/environment';
import { PagerService } from 'app/services/pager.service';
import { EditorComponent } from './pages/panel/editor/editor.component';
import { ProductoComponent } from './pages/productos/producto/producto.component';
import { DetalleproductoComponent } from './pages/productos/detalleproducto/detalleproducto.component';
import { LoginComponent } from './auth/login/login/login.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutusComponent,
    InformacionComponent,
    NewsComponent,
    PanelComponent,
    CreateprodComponent,
    EditprodComponent,
    EditorComponent,
    ProductoComponent,
    DetalleproductoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TinymceModule.withConfig({
      selector: 'textarea',
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
      ],
      toolbar: 'undo redo | insert | styleselect | bold italic | fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview | forecolor backcolor emoticons',
      fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
      language: "es_MX"
    })
  ],
  providers: [
    ContactService,
    UploadService,
    PanelService,
    PagerService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
