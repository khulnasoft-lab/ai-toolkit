import { AITOOLKITError } from './ai-toolkit-error';
import { getErrorMessage } from './get-error-message';

const name = 'AI_JSONParseError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

// TODO v5: rename to ParseError
export class JSONParseError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly text: string;

  constructor({ text, cause }: { text: string; cause: unknown }) {
    super({
      name,
      message:
        `JSON parsing failed: ` +
        `Text: ${text}.\n` +
        `Error message: ${getErrorMessage(cause)}`,
      cause,
    });

    this.text = text;
  }

  static isInstance(error: unknown): error is JSONParseError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
