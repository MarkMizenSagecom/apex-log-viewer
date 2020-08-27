/// <reference lib="webworker" />

import { LogEntry } from "../models/log-entry";
import { TreeNode } from "../models/tree";

addEventListener('message', async ({ data }) => {
  const response = await buildNodes(data, []);
  postMessage(response);
});

async function buildNodes(entries: LogEntry[], nodes: TreeNode[] = []): Promise<TreeNode[]> {

  // TODO Check for skipped entries

  while (entries.length > 0) {
    const thisEntry = entries.shift();

    if (!thisEntry) {
      break;
    }

    switch (thisEntry.type) {
      case 'CODE_UNIT_STARTED':
      case 'CONSTRUCTOR_ENTRY':
      case 'METHOD_ENTRY':
      case 'SYSTEM_METHOD_ENTRY':
      case 'SYSTEM_CONSTRUCTOR_ENTRY':

        nodes.push({
          label: thisEntry.type,
          entry: thisEntry,
          children: await buildNodes(entries)
        });
        break;

      case 'CODE_UNIT_FINISHED':
      case 'CONSTRUCTOR_EXIT':
      case 'METHOD_EXIT':
      case 'SYSTEM_METHOD_EXIT':
      case 'SYSTEM_CONSTRUCTOR_EXIT':

        // nodes.push({
        //   label: thisEntry.type,
        //   entry: thisEntry,
        // });

        return Promise.resolve(nodes);

      default:

        nodes.push({
          entry: thisEntry,
          label: thisEntry.type
        });
        break;
    }
  }

  return Promise.resolve(nodes);
}
