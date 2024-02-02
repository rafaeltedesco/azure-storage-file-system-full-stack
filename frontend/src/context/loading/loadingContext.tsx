// loadingContext.tsx
import { createContext } from 'react';

type ContextProps = {
  loading: boolean;
  handleLoading: () => void;
  handleNotLoading: () => void;
};

export const loadingContext = createContext<ContextProps>({ } as ContextProps);
