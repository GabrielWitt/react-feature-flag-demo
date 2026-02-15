export const parseJsonResponse = async <T>(
  response: Response,
  messages?: {
    empty?: string;
    invalid?: string;
  },
): Promise<T> => {
  const raw = await response.text();

  if (!raw.trim()) {
    throw new Error(messages?.empty ?? 'The server returned an empty response. Please try again.');
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(
      messages?.invalid ?? 'The server response could not be processed. Please try again.',
    );
  }
};
