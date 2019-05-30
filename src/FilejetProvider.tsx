import React, { createContext, PureComponent, ReactNode } from 'react';
import { ExtractOptional } from './utils';

export const context = createContext<Required<FilejetConfig> | null>(null);

context.displayName = 'FilejetContext';

const { Provider } = context;

const defaultConfig: ExtractOptional<FilejetConfig> = {
  maxDPR: 2
};

interface Props {
  readonly config: FilejetConfig;
  readonly children: ReactNode;
}

export class FilejetProvider extends PureComponent<Props> {
  render() {
    const { config, children } = this.props;
    const configuration = { ...defaultConfig, ...config };
    return <Provider value={configuration}>{children}</Provider>;
  }
}

export interface FilejetConfig {
  readonly storageId: string;
  readonly maxDPR?: number;
}
