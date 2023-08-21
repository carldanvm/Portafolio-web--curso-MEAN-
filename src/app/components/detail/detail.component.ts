import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [
    ProjectService
  ]
})
export class DetailComponent implements OnInit {
  public project!: Project
  public url: string
  public projectId!: string

  constructor( 
    private _projectService: ProjectService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
               
    this.url = global.url
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id']
      this.getProject(id)
      this.projectId = id
    })
  }

  getProject(id:string){
    this._projectService.getProject(id).subscribe(
      (Response:any) => {
        this.project = Response.project
      },
      error =>{
        console.log(<any>error);
      }
    )
  }

  deleteProject(id:string){
    this._projectService.deleteProject(id).subscribe(
      response => {
        this._router.navigate(['/projects'])
      }
    )
  }

}
