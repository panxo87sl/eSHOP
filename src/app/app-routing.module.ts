import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/pages/home/home.component';
import { AboutusComponent } from 'app/pages/aboutus/aboutus.component';
import { InformacionComponent } from 'app/pages/informacion/informacion.component';
import { PanelComponent } from 'app/pages/panel/panel.component';
import { PanelRoutingModule } from 'app/pages/panel/panel-routing.module';
import { ProductoComponent } from 'app/pages/productos/producto/producto.component';
import { DetalleproductoComponent } from 'app/pages/productos/detalleproducto/detalleproducto.component';
import { LoginComponent } from 'app/auth/login/login/login.component';
import { EditprodComponent } from './pages/panel/editprod/editprod.component';

const routes: Routes = [
  {path: '', component: ProductoComponent},
  {path: 'sobre-nosotros', component: AboutusComponent },
  {path: 'informacion', component: InformacionComponent },
  {path: 'panel', component: PanelComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'detalle-producto/:id',component: DetalleproductoComponent},
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PanelRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
