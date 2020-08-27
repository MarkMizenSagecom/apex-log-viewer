import { LogEntry } from '../models/log-entry';

export interface LogParserListener {

  logParseProgressUpdate(linesParsed: number, numLines: number): any;

  logParseComplete(parser: LogParser): any;

}

export class LogParser {

  private static readonly MAXIMUM_LOG_SIZE_NOTICE =
      '*********** MAXIMUM DEBUG LOG SIZE REACHED ***********';

  private static readonly BATCH_SIZE = 200;

  public allEntries: LogEntry[] = [];

  public categories: Set<string> = new Set();

  public limitReached = false;

  public constructor(private listener: LogParserListener) {}

  /**
   * Parses a log file and notifies the listener of progress.
   *
   * @param fileContents
   */
  public parse(fileContents: string): void {

    const lines: string[] = fileContents.split('\n');

    this.parseNextBatch(lines, 0, LogParser.BATCH_SIZE);
  }

  /**
   * Parses a batch of log lines.
   *
   * After completing a batch, schedules the next batch.
   *
   * After all batches have been parsed, notifies the listener.
   *
   * @param lines
   * @param startIndex
   * @param batchSize
   */
  private parseNextBatch(
      lines: string[],
      startIndex: number,
      batchSize: number): void {

    // Determine end index (the next index AFTER this batch)
    let endIndex = startIndex + batchSize;
    if (endIndex >= lines.length) {
      // Reached the end of the file
      endIndex = lines.length;
    }

    // Parse lines
    for (let i = startIndex; i < endIndex; i++) {
      const entry: LogEntry = this.parseLine(lines[i]) as LogEntry;
      if (entry) {
        this.categories.add(entry.type);
        this.allEntries.push(entry);
      }
    }

    if (endIndex < lines.length) {
      // Schedule next batch
      if (this.listener) {
        this.listener.logParseProgressUpdate(endIndex, lines.length);
      }
      setTimeout(() => this.parseNextBatch(lines, endIndex, batchSize), 0);

    } else if (this.listener) {
      // Finished parsing
      this.listener.logParseProgressUpdate(lines.length, lines.length);
      this.listener.logParseComplete(this);
    }
  }

  /**
   * Parses a single line of a log file.
   *
   * @param line
   */
  private parseLine(line: string): LogEntry | null {

    /*
     * Special cases
     */

    // First line
    if (this.allEntries.length === 0) {
      const timestamp: string = 'START';
      const timeElapsed: number = 0;
      const type: string = 'HEADER';
      const message: string = line;
      return { timestamp, timeElapsed, type, message };

    // Maximum debug log size reached!
    } else if (line === LogParser.MAXIMUM_LOG_SIZE_NOTICE) {
      const prevEntry: LogEntry = this.allEntries[this.allEntries.length - 1];
      const timestamp: string = prevEntry.timestamp;
      const timeElapsed: number = prevEntry.timeElapsed;
      const type: string = 'NOTICE';
      const message: string = line;
      this.limitReached = true;
      return { timestamp, timeElapsed, type, message };

    // Continuation line
    } else if (!this.hasTimestamp(line)) {
      this.parseContinuationLine(line);
      return null;
    }

    /*
     * Regular log entries
     */

    const parts: string[] = line.split('|');

    // All entries start with a timestamp
    const { timestamp, timeElapsed } = this.parseTimestamp(parts.shift() as string);

    if (parts.length == 1) {
      // typeOrMessage
      const remainder: string = parts.shift() as string;
      let type: string;
      let message: string = '';
      if (remainder.match(/[A-Z_]/)) {
        type = remainder;
      } else {
        console.log('Unknown type for message: ', message);
        type = 'OTHER';
        message = remainder;
      }
      return { timestamp, timeElapsed, type, message };

    } else if (parts.length == 2) {
      // type | lineNumberOrMessage
      let type: string = parts.shift() as string;
      const remainder: string = parts.shift() as string;
      let lineNumber = '';
      let message = '';
      if (remainder.startsWith('[')) {
        lineNumber = this.stripEnclosingPunctuation(remainder);
      } else {
        message = remainder;
      }
      return { timestamp, timeElapsed, type, lineNumber, message };

    } else {
      // type | lineNumber? | message
      const type: string = parts.shift() as string;
      const next: string = parts[0];
      let lineNumber = '';
      if (next.startsWith('[')) {
        lineNumber = this.stripEnclosingPunctuation(parts.shift() as string);
      }
      const message: string = parts.join('|');
      return { timestamp, timeElapsed, type, lineNumber, message };
    }
  }

  /**
   * Checks if a line starts with a timestamp.
   *
   * @param line
   */
  private hasTimestamp(line: string): boolean {
    // Timestamps are of the form:
    //  dd:dd:dd.d+ (d+)
    // e.g. 14:12:44.419 (126419807629)
    return !!line.match(/\d\d:\d\d:\d\d\.\d+ \(\d+\)/);
  }

  /**
   * Appends a log line to the previous LogEntry.
   *
   * @param line
   */
  private parseContinuationLine(line: string): void {
    const prevEntry: LogEntry = this.allEntries[this.allEntries.length - 1];
    if (prevEntry.message) {
      prevEntry.message += '\n' + line;
    } else {
      prevEntry.message = line;
    }
  }

  /**
   * Parses the "timestamp part" of a log file.
   *
   * @param timestampPart Timestamp in the form 'HH:mm:ss.SSS (nanoseconds)'.
   * @return The parsed values in the form { timestamp, timeElapsed }.
   */
  private parseTimestamp(timestampPart: string): {timestamp: string, timeElapsed: number} {
    const parts: string[] = timestampPart.split(' ');
    const timestamp: string = parts[0];
    const timeElapsed: number = Number(this.stripEnclosingPunctuation(parts[1]));
    return { timestamp, timeElapsed };
  }

  /**
   * Strips the first and last characters from a string.
   *
   * @param s
   */
  private stripEnclosingPunctuation(s: string): string {
    return s.substr(1, s.length - 2);
  }

}
