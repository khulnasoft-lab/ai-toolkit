import { AITOOLKITError, NoSuchModelError } from '@ai-toolkit/provider';

const name = 'AI_NoSuchProviderError';
const marker = `khulnasoft.com.error.${name}`;
const symbol = Symbol.for(marker);

export class NoSuchProviderError extends NoSuchModelError {
  private readonly [symbol] = true; // used in isInstance

  readonly providerId: string;
  readonly availableProviders: string[];

  constructor({
    modelId,
    modelType,
    providerId,
    availableProviders,
    message = `No such provider: ${providerId} (available providers: ${availableProviders.join()})`,
  }: {
    modelId: string;
    modelType: 'languageModel' | 'textEmbeddingModel';
    providerId: string;
    availableProviders: string[];
    message?: string;
  }) {
    super({ errorName: name, modelId, modelType, message });

    this.providerId = providerId;
    this.availableProviders = availableProviders;
  }

  static isInstance(error: unknown): error is NoSuchProviderError {
    return AITOOLKITError.hasMarker(error, marker);
  }
}
