export const sanitizeFilename = (filename: string) =>
  filename.replace(/[^a-zA-Z0-9_.-]/g, '_');
