import { IMember, Member } from './../../shared/models/member';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl = environment.apiUrl;
  private membersSource = new BehaviorSubject<IMember[]>([]);
  members$ = this.membersSource.asObservable();
  members: IMember[] = [];

  private memberSource = new BehaviorSubject<IMember>(new Member());
  member$ = this.membersSource.asObservable();
  member: any;

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get(this.baseUrl + 'member').pipe(
      map((member: any) => {
        this.membersSource.next(member);
        this.members = this.membersSource.value;
      })
    );
  }

  getMemberRoles(id: string){
    return this.http.get(this.baseUrl + `member/userrole/${id}`);
  }

  getMember(id: number) {
    return this.http.get(this.baseUrl + `member/${id}`).pipe(
      map((member: any) => {
        this.memberSource.next(member);
        this.member = this.memberSource.value;
      })
    );
  }

  getCurrentMember(){
    return this.memberSource.value;
  }

  assignRole(values: any) {
    return this.http.post(this.baseUrl + `member/assignrole`, values);
  }

  deleteMember(id:number){
    return this.http.delete(this.baseUrl + `member/delete/${id}`);
  }
}
