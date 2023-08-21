import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders } from '@angular/common/http'
import {Observable} from 'rxjs'
import {Project} from '../models/project'
import { global } from './global'

@Injectable()
export class ProjectService{
    public url: string;

    constructor( private _http: HttpClient ){
        this.url = global.url
    }

    saveProject(project: Project):Observable<any>{
        let params = JSON.stringify(project)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.post(this.url + 'save-project', params, {headers: headers})
        
    }

    getProjects(){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.get(this.url+'get-projects', {headers: headers})
        
    }

    getProject(id:string){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.get(this.url+'get-project/'+id, {headers: headers})
    }

    deleteProject(id:string){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.delete(this.url+'delete-project/'+id, {headers: headers})
    }
}