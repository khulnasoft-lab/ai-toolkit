import { AITOOLKITError } from '@ai-toolkit/provider';

const name = 'AI_InvalidDataContentError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class InvalidDataContentError extends AITOOLKITError {
  private readonly [symbol] = true; // used in isInstance

  readonly content: unknown;

  constructor({
    content,
    cause,
    message = `Invalid data content. Expected a base64 string, Uint8Array, ArrayBuffer, or Buffer, but got ${typeof content}.`,
  }: {
    content: unknown;
    cause?: unknown;
    message?: string;
  }) {
    super({ name, message, cause });

    this.content = content;
  }

  static isInstance(error: unknown): error is InvalidDataContentError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
