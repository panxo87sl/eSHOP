import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from "app/_guards/auth.guard";
import { PanelComponent } from "app/pages/panel/panel.component";
import { EditprodComponent } from "app/pages/panel/editprod/editprod.component";
import { CreateprodComponent } from 'app/pages/panel/createprod/createprod.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from 'app/pages/panel/editor/editor.component';

const routes: Routes = [    
    {
        path: 'panel',
        component: PanelComponent,
        children: [
            { path: 'create_prod', component: CreateprodComponent },
            { path: 'edit_prod', component: EditprodComponent },
            { path: 'editor/:id', component: EditorComponent }
        ]//,
        //canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
    exports: [RouterModule]
})
export class PanelRoutingModule { }
