import { MemberService } from './member.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  members: any[] = [];

  constructor(
    private router: Router,
    private memberService: MemberService,
  ) {}

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers() {
    this.memberService.getMembers().subscribe(() => {
      this.members = this.memberService.members;
      this.members.forEach(member => {
        
        // get member roles then add to member.roles
        this.memberService.getMemberRoles(member.id).subscribe(response => {
          member.roles = response
        })
      });
    });
  }

  addMemberBtn() {
    this.router.navigateByUrl('/admin/member/add');
  }

  deletePage(id:number){
    this.memberService.deleteMember(id).subscribe(() => {
      this.getMembers();
    });
  }
}
