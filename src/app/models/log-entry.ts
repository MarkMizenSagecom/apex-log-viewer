// See:
// https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_debugging_debug_log.htm
export interface LogEntry {

  /**
   * Timestamp in the form HH:mm:ss.SSS.
   */
  timestamp: string;

  /**
   * Time elapsed in nanoseconds
   */
  timeElapsed: number;

  /**
   * Type of log entry.
   *
   * The full list of types is documented here:
   * https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_debugging_system_log_console.htm
   */
  type: string;

  /**
   * Line number that triggered the message.
   */
  lineNumber?: string;

  /**
   * Log message.
   */
  message: string;
}
