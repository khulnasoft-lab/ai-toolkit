'use client';

import { Message, useChat } from '@ai-toolkit/react';
import { createIdGenerator } from 'ai';

export default function Chat({
  id,
  initialMessages,
}: { id?: string | undefined; initialMessages?: Message[] } = {}) {
  const { input, status, handleInputChange, handleSubmit, messages, stop } =
    useChat({
      api: '/api/use-chat-resilient-persistence',
      id, // use the provided chatId
      initialMessages, // initial messages if provided
      sendExtraMessageFields: true, // send id and createdAt for each message
      generateId: createIdGenerator({ prefix: 'msgc', size: 16 }), // id format for client-side messages
    });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={status !== 'ready'}
        />
        {status === 'streaming' && (
          <button
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            type="submit"
            onClick={stop}
          >
            Stop
          </button>
        )}
      </form>
    </div>
  );
}
