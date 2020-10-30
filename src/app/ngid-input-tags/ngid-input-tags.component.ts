import { Component, Input, OnInit } from '@angular/core';
import { Tag } from './model/tag-model';

@Component({
    selector: 'ngid-input-tags',
    templateUrl: './ngid-input-tags.component.html',
    styleUrls: ['./ngid-input-tags.component.scss']
})
export class NgidInputTagsComponent implements OnInit {
    @Input('dataSource') public tag: Tag;
    public previousTime = new Date().getTime();
    public isFocusIn = false;
    public placeholder = 'Tambahkan Tag';
    constructor() {}
    
    ngOnInit() { }

    handleEnter(event: any): void {
        this.tag.addTag(event.target.value);
        event.target.size = 1;
        event.target.value = '';
    }

    handleBackspace(event: any): void {
        if (event.target.value === '') {
            const currentTime = new Date().getTime();
            if (currentTime - this.previousTime < 1000) {
                const lastTag = this.tag.requestValues.pop();
                event.target.value = lastTag;
                event.target.size = event.target.value.length + 1;
            }
            this.previousTime = currentTime;
        } 
    }

    handleInput(event: any): void {
        if (event.data === ',') {
            const tagList = this.tag.getTagListByString(event.target.value);
            this.tag.bulkAddTag(tagList);
            event.target.size = 1;
            event.target.value = '';
        } else {
            event.target.size = event.target.value.length + 1;
        }
    }

    handleFocusIn(): void {
        this.isFocusIn = true;
    }

    handleFocusOut(event: any): void {
        this.tag.addTag(event.target.value);
        event.target.size = this.tag.requestValues.length > 0 ? 1 : this.placeholder.length;
        event.target.value = '';
        this.isFocusIn = false;
    }


    handlePaste(event: any): void {
        const clipboardData = event.clipboardData;
        const pasteText = clipboardData.getData('text');
        const arrayOfPasteText = this.tag.getTagListByString(pasteText);
        this.tag.bulkAddTag(arrayOfPasteText);
        event.target.hidden = true;
        event.target.value = '';
    
    }

    handleCopyTags(): void {
        const textAreaElement = document.createElement('textarea');
        textAreaElement.textContent = this.tag.stringValues;
        document.body.appendChild(textAreaElement);
        textAreaElement.select();
        document.execCommand('copy');
        document.body.removeChild(textAreaElement);
    }

    handleDeleteAll(element: any): void {
        this.tag.deleteAll();
        element.size = this.placeholder.length;
    }

    handleClickTagItem(event: any): void {
        event.preventDefault();
        event.stopPropagation();
    }

    handleFocusOutTagInside(event: any, index: number): void {
        const tag = event.target.innerHTML;
        if (!tag) this.tag.removeAt(index);
        if (this.tag.requestValues[index] !== tag) {
            this.tag.getIndexOfTag(tag) !== -1 ?  
                this.tag.removeAt(index) : this.tag.setTagByIndex(index, tag);
        }
    }

    handleRemoveTag(index: number): void {
        this.tag.removeAt(index)
    }

    handleInputTagInside(event: any): void {
        event.target.size = event.target.value.length + 1;
    }

    handleClickUlTagContent(inputTag: any): void {
        inputTag.hidden = false;
        inputTag.focus();
    }
}
