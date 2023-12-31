import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateComponent } from './components/create/create.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path : '', component : AboutComponent,},
  { path : 'about', component : AboutComponent,},
  { path : 'contact', component : ContactComponent,},
  { path : 'create', component : CreateComponent,},
  { path : 'projects', component : ProjectsComponent,},
  { path : 'proyecto/:id', component : DetailComponent,},
  { path : 'edit/:id', component : EditComponent,},
  { path : '**', component : AboutComponent,},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
