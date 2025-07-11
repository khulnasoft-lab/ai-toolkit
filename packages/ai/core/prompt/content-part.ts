import { z } from 'zod';
import {
  ProviderMetadata,
  providerMetadataSchema,
  ProviderOptions,
} from '../types/provider-metadata';
import { DataContent, dataContentSchema } from './data-content';
import {
  ToolResultContent,
  toolResultContentSchema,
} from './tool-result-content';

/**
Text content part of a prompt. It contains a string of text.
 */
export interface TextPart {
  type: 'text';

  /**
The text content.
   */
  text: string;

  /**
Additional provider-specific metadata. They are passed through
to the provider from the AI TOOLKIT and enable provider-specific
functionality that can be fully encapsulated in the provider.
 */
  providerOptions?: ProviderOptions;

  /**
@deprecated Use `providerOptions` instead.
 */
  experimental_providerMetadata?: ProviderMetadata;
}

/**
@internal
 */
export const textPartSchema: z.ZodType<TextPart> = z.object({
  type: z.literal('text'),
  text: z.string(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional(),
});

/**
Image content part of a prompt. It contains an image.
 */
export interface ImagePart {
  type: 'image';

  /**
Image data. Can either be:

- data: a base64-encoded string, a Uint8Array, an ArrayBuffer, or a Buffer
- URL: a URL that points to the image
   */
  image: DataContent | URL;

  /**
Optional mime type of the image.
   */
  mimeType?: string;

  /**
Additional provider-specific metadata. They are passed through
to the provider from the AI TOOLKIT and enable provider-specific
functionality that can be fully encapsulated in the provider.
 */
  providerOptions?: ProviderOptions;

  /**
@deprecated Use `providerOptions` instead.
 */
  experimental_providerMetadata?: ProviderMetadata;
}

/**
@internal
 */
export const imagePartSchema: z.ZodType<ImagePart> = z.object({
  type: z.literal('image'),
  image: z.union([dataContentSchema, z.instanceof(URL)]),
  mimeType: z.string().optional(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional(),
});

/**
File content part of a prompt. It contains a file.
 */
export interface FilePart {
  type: 'file';

  /**
File data. Can either be:

- data: a base64-encoded string, a Uint8Array, an ArrayBuffer, or a Buffer
- URL: a URL that points to the image
   */
  data: DataContent | URL;

  /**
Optional filename of the file.
   */
  filename?: string;

  /**
Mime type of the file.
   */
  mimeType: string;

  /**
Additional provider-specific metadata. They are passed through
to the provider from the AI TOOLKIT and enable provider-specific
functionality that can be fully encapsulated in the provider.
 */
  providerOptions?: ProviderOptions;

  /**
@deprecated Use `providerOptions` instead.
 */
  experimental_providerMetadata?: ProviderMetadata;
}

/**
@internal
 */
export const filePartSchema: z.ZodType<FilePart> = z.object({
  type: z.literal('file'),
  data: z.union([dataContentSchema, z.instanceof(URL)]),
  filename: z.string().optional(),
  mimeType: z.string(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional(),
});

/**
 * Reasoning content part of a prompt. It contains a reasoning.
 */
export interface ReasoningPart {
  type: 'reasoning';

  /**
The reasoning text.
   */
  text: string;

  /**
An optional signature for verifying that the reasoning originated from the model.
   */
  signature?: string;

  /**
Additional provider-specific metadata. They are passed through
to the provider from the AI TOOLKIT and enable provider-specific
functionality that can be fully encapsulated in the provider.
 */
  providerOptions?: ProviderOptions;

  /**
@deprecated Use `providerOptions` instead.
 */
  experimental_providerMetadata?: ProviderMetadata;
}

/**
@internal
 */
export const reasoningPartSchema: z.ZodType<ReasoningPart> = z.object({
  type: z.literal('reasoning'),
  text: z.string(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional(),
});

/**
Redacted reasoning content part of a prompt.
 */
export interface RedactedReasoningPart {
  type: 'redacted-reasoning';

  /**
Redacted reasoning data.
   */
  data: string;

  /**
Additional provider-specific metadata. They are passed through
to the provider from the AI TOOLKIT and enable provider-specific
functionality that can be fully encapsulated in the provider.
 */
  providerOptions?: ProviderOptions;

  /**
@deprecated Use `providerOptions` instead.
 */
  experimental_providerMetadata?: ProviderMetadata;
}

/**
@internal
 */
export const redactedReasoningPartSchema: z.ZodType<RedactedReasoningPart> =
  z.object({
    type: z.literal('redacted-reasoning'),
    data: z.string(),
    providerOptions: providerMetadataSchema.optional(),
    experimental_providerMetadata: providerMetadataSchema.optional(),
  });

/**
Tool call content part of a prompt. It contains a tool call (usually generated by the AI model).
 */
export interface ToolCallPart {
  type: 'tool-call';

  /**
ID of the tool call. This ID is used to match the tool call with the tool result.
 */
  toolCallId: string;

  /**
Name of the tool that is being called.
 */
  toolName: string;

  /**
Arguments of the tool call. This is a JSON-serializable object that matches the tool's input schema.
   */
  args: unknown;

  /**
Additional provider-specific metadata. They are passed through
to the provider from the AI TOOLKIT and enable provider-specific
functionality that can be fully encapsulated in the provider.
 */
  providerOptions?: ProviderOptions;

  /**
@deprecated Use `providerOptions` instead.
 */
  experimental_providerMetadata?: ProviderMetadata;
}

/**
@internal
 */
export const toolCallPartSchema: z.ZodType<ToolCallPart> = z.object({
  type: z.literal('tool-call'),
  toolCallId: z.string(),
  toolName: z.string(),
  args: z.unknown(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional(),
}) as z.ZodType<ToolCallPart>; // necessary bc args is optional on Zod type

/**
Tool result content part of a prompt. It contains the result of the tool call with the matching ID.
 */
export interface ToolResultPart {
  type: 'tool-result';

  /**
ID of the tool call that this result is associated with.
 */
  toolCallId: string;

  /**
Name of the tool that generated this result.
  */
  toolName: string;

  /**
Result of the tool call. This is a JSON-serializable object.
   */
  result: unknown;

  /**
Multi-part content of the tool result. Only for tools that support multipart results.
   */
  experimental_content?: ToolResultContent;

  /**
Optional flag if the result is an error or an error message.
   */
  isError?: boolean;

  /**
Additional provider-specific metadata. They are passed through
to the provider from the AI TOOLKIT and enable provider-specific
functionality that can be fully encapsulated in the provider.
 */
  providerOptions?: ProviderOptions;

  /**
@deprecated Use `providerOptions` instead.
 */
  experimental_providerMetadata?: ProviderMetadata;
}

/**
@internal
 */
export const toolResultPartSchema: z.ZodType<ToolResultPart> = z.object({
  type: z.literal('tool-result'),
  toolCallId: z.string(),
  toolName: z.string(),
  result: z.unknown(),
  content: toolResultContentSchema.optional(),
  isError: z.boolean().optional(),
  providerOptions: providerMetadataSchema.optional(),
  experimental_providerMetadata: providerMetadataSchema.optional(),
}) as z.ZodType<ToolResultPart>; // necessary bc result is optional on Zod type
