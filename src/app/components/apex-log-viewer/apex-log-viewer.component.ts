import { Component, ViewChild, ElementRef } from '@angular/core';
import { LogCategoriesComponent } from '../category-panel/category-panel.component';
import { LogEntry } from '../../models/log-entry';
import { LogParserListener, LogParser } from '../../utils/log-parser';

@Component({
  selector: 'apex-log-viewer-root',
  templateUrl: './apex-log-viewer.component.html',
  styleUrls: ['./apex-log-viewer.component.scss']
})
export class ApexLogViewerComponent implements LogParserListener {

  @ViewChild('fileInput') fileInput !: ElementRef;

  public filename: string;

  public allEntries: LogEntry[] = [];

  public filteredEntries: LogEntry[] = [];

  public categories: string[] = [];

  // Map of category -> enabled
  public categoryMap: Map<string, boolean> = new Map();

  public keywordFilter = '';

  public linesParsed = 0;

  public numLines = 0;

  public showLimitWarning = false;

  public triggerFileSelection(): void {
    this.fileInput.nativeElement.click();
  }

  public handleFiles(files: FileList): void {
    const file: File = files[0];
    this.filename = file.name;

    // Read file contents
    const reader: FileReader = new FileReader();
    reader.onload = (event: ProgressEvent) =>
      this.processLogFile(<string>(<FileReader>event.target).result);
    reader.readAsText(file);
  }

  private processLogFile(fileContents: string): void {
    const parser: LogParser = new LogParser(this);
    parser.parse(fileContents);
  }

  public logParseProgressUpdate(linesParsed: number, numLines: number) {
    this.linesParsed = linesParsed;
    this.numLines = numLines;
  }

  public logParseComplete(parser: LogParser): void {

    // Show a warning if the log has reached the maximum size
    this.showLimitWarning = parser.limitReached;

    // Save entries
    this.allEntries = parser.allEntries;

    // Sort categories by name
    this.categories = Array.from(parser.categories).sort();

    // Produce map of category -> visibility
    this.categories.forEach(cat => {
      this.categoryMap.set(cat, true);
    });

    // Hide some categories by default
    this.hideOnlyCategories(LogCategoriesComponent.HIDDEN_BY_DEFAULT);

    // Show only the log entries that match the filters
    this.filterLog();
  }

  public changeCategory(event: { cat: string, visible: boolean }): void {
    this.categoryMap.set(event.cat, event.visible);
    this.filterLog();
  }

  public showOnlyCategories(categories: string[]): void {

    // Hide all
    this.categoryMap.forEach((_: boolean, key: string) => {
      this.categoryMap.set(key, false);
    });

    // Show requested
    categories.forEach(cat => {
      this.categoryMap.set(cat, true);
    });

    this.filterLog();
  }

  public hideOnlyCategories(categories: string[]): void {

    // Show all
    this.categoryMap.forEach((value: boolean, key: string) => {
      this.categoryMap.set(key, true);
    });

    // Hide requested
    categories.forEach(cat => {
      this.categoryMap.set(cat, false);
    });

    this.filterLog();
  }

  public changeKeywordFilter(keywordFilter: string): void {
    this.keywordFilter = keywordFilter;
    this.filterLog();
  }

  private filterLog(): void {

    // Filter by category
    this.filteredEntries = this.allEntries.filter(entry => {
      return this.categoryMap.get(entry.type);
    });

    // Filter by keyword
    if (this.keywordFilter) {
      const keywordFilterLowerCase = this.keywordFilter.toLowerCase();
      this.filteredEntries = this.filteredEntries.filter(entry => {
        return entry.message.toLowerCase().match(keywordFilterLowerCase);
      });
    }
  }

  public clearLog(): void {
    this.filename = '';
    this. allEntries = [];
    this.filteredEntries = [];
    this.categories = [];
    this.categoryMap = new Map();
    this.keywordFilter = '';
    this.linesParsed = 0;
    this.numLines = 0;
    this.showLimitWarning = false;
  }

}
