import { Component, OnInit } from '@angular/core';
import { Tag } from './ngid-input-tags/model/tag-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tag: Tag = new Tag();
  title = 'angular-input-tags';

  constructor() {}

  ngOnInit(): void {
    this.doSetTagRequestValues();
  }

  private doSetTagRequestValues(): void {
    const tagList = ['NodeJS', 'Angular', 'Express', 'React', 'Vue'];
    this.tag.setRequestValues(tagList);
  }

  public handleSubmit(): void {
    console.log('Info: Come from handleSubmit');
    console.log(this.tag.requestValues);
  }
}
