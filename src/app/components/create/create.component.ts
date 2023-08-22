import { Component, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UploadService } from 'src/app/services/upload.service';
import { global } from 'src/app/services/global';
import { ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent {

    public title: string;
    public project: Project;
    public status!: boolean;
    public filesToUpload!: Array<File>;
    public url: string
  

    constructor( private _projectService: ProjectService,
                 private _uploadService: UploadService ) 
    {
      this.title = "Añadir proyecto";
      this.url = global.url
      this.project = new Project("", "", "", "", "", 2023, "")
      
    }

    onSubmit(form: any) {

      console.log(form.value);

      this._projectService.saveProject(this.project).subscribe(
        response => {
          if (response.project) {

            if (this.filesToUpload){
              this.status = true
              this._uploadService.makeFileRequest(global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image')
              form.resetForm()
            }

            

          }else{
            this.status = false;
          }
        },
        error => {
          console.log(<any>error);
        }
      )
      
    }

    fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files
      
      
    }
    

}
