import { Photo } from './../models/photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members:Member[] = [];
  constructor(private http:HttpClient) { }

  getMembers(): Observable<Member[]> {
    if(this.members.length){
      return of(this.members);
    }
    return this.http.get<Member[]>(`${this.baseUrl}users`).pipe(
      tap(members => this.members = members));
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(m => m.username === username);
      if(member){
      return of(member)};
      return this.http.get<Member>(`${this.baseUrl}users/${username}`)
  }

  updateMember(member:Member){

    return this.http.put(`${this.baseUrl}users`, member).pipe(
    tap(_ => {
      const index = this.members.findIndex(m => m.id === member.id);
      this.members[index] = member;
     }))
  }

  setMainPhoto(PhotoId :number): Observable<any>{

    return this.http.put(`${this.baseUrl}users/set-Main-Photo/${PhotoId}`,{});
  }

  deletePhoto(PhotoId:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}users/delete-photo/${PhotoId}`);
  }
}
