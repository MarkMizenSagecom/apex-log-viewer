import { LogEntry } from './log-entry';

export interface TreeNode {
  label: string;
  children?: TreeNode[];
  entry: LogEntry;
}
