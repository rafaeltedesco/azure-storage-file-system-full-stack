export type objectUrl = string;

export type FileButtonPropos = {
  files: [File, objectUrl][],
  resetFiles(): void,
  containerName: string,
}



