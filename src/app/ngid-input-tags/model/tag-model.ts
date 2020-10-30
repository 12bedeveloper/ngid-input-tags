import { EventEmitter } from '@angular/core';
import { stringify } from 'querystring';

export class Tag {
    requestValues: Array<string> = new Array();
    requestValueChanges: EventEmitter<Array<string>> = new EventEmitter();
    constructor() {}

    setRequestValues(values: Array<string>): void {
        this.requestValues = values;
        this.requestValueChanges.emit(values);
    }

    getIndexOfTag(tag: string): number {
        return this.requestValues.indexOf(tag);
    }

    addTag(tag: string): void {
        if (tag && tag.trim() !== '' &&this.getIndexOfTag(tag) === -1) this.requestValues.push(tag);
    }

    bulkAddTag(tagList: Array<string>): void {
        tagList.forEach((tag: string) => {
            this.addTag(tag);
        })
    }

    removeAt(index: number): void {
        this.requestValues.splice(index, 1);
    }

    setTagByIndex(index: number, tag: string): void {
        this.requestValues[index] = tag;
    }

    getTagListByString(str: string): Array<string> {
        return str.split(',');
    }

    get stringValues(): string {
        return this.requestValues.join(',');
    }

    deleteAll(): void {
        this.requestValues.splice(0);
    }
}