import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent {

  public title: string;
  public project!: Project;
  public status!: boolean;
  public filesToUpload!: Array<File>;
  public projectId!: string
  public url:string

  
  constructor( private _projectService: ProjectService,
               private _uploadService: UploadService,
               private _route: ActivatedRoute,
               private _router: Router ) 
  {
    this.title = "Editar Proyecto"
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

  onSubmit(form: any) {
    
    this._projectService.updateProject(this.project).subscribe(
      (response:any) => {
        if (response.project) {
          this.status = true;
          
          this._uploadService.makeFileRequest(this.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image')
          
          form.resetForm()
          this._router.navigate(['/proyecto/'+response.project._id])
          
        }else{
          this.status = false;
        }
      }
    )
    
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files
    
    
  }

}
