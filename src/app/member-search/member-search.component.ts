import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css'],
})
export class MemberSearchComponent implements OnInit {
  members$: Observable<Member[]>;

  // Subject: Observable を継承したクラス。データの発行・購読 両方が可能
  private searchTerms = new Subject<string>();

  constructor(private memberService: MemberService) {}

  // 受け取った term を searchTerms へセット
  search(term: string): void {
    this.searchTerms.next(term);
  }

  // searchTerms の変更を監視して変更の都度 .pipe() の中身を実行
  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.memberService.searchMember(term))
    );
  }
}
