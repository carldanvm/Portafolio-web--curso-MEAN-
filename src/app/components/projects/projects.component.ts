import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { global } from 'src/app/services/global';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent {
  public projects!: Project[];
  public url:string;
 

  constructor(private _projectService: ProjectService) {
    this.getProjects();
    this.url = global.url
  }
  
  getProjects(){
    this._projectService.getProjects().subscribe(
      (response:any) => {
        this.projects = response.projects
          
      },

      error => {
        console.log(<any>error);
      }
    )
  }

}
