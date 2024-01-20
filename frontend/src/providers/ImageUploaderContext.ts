import { createContext } from 'react';

type ContextProps = {
  containerName: string,
  setContainerName: React.Dispatch<React.SetStateAction<string>>
}

export const ImageUploaderContext = createContext({} as ContextProps);