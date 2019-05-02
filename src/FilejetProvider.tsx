import React, { createContext, ReactNode } from 'react';

export const context = createContext<Required<FilejetConfig> | null>(null);

context.displayName = 'FilejetContext';

const { Provider } = context;

const defaultConfig = {
  maxDPR: 2
};

interface Props {
  readonly config: FilejetConfig;
  readonly children: ReactNode;
}

export function FilejetProvider({ config, children }: Props) {
  const configuration = { ...defaultConfig, ...config };
  return <Provider value={configuration}>{children}</Provider>;
}

export interface FilejetConfig {
  readonly storageId: string;
  readonly maxDPR?: number;
}
