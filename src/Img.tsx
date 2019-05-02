import React, { ImgHTMLAttributes } from 'react';
import { context } from './FilejetProvider';
import { Omit, toFileUrl, toSizeMutation } from './utils';

export interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  readonly src: string;
  readonly width?: number;
  readonly height?: number;
  readonly srcMutation?: string;
  readonly srcSetMutation?: { [key: string]: string };
}

const { Consumer } = context;

export function Img(props: ImgProps) {
  return (
    <Consumer>
      {config => {
        if (config == null) {
          throw Error(
            'No <FilejetProvider> found! To use "<Img>" component, you need to wrap it' +
              ' into <FilejetProvider> component.'
          );
        }

        const { storageId, maxDPR } = config;
        const { src, width, height, srcMutation, srcSetMutation, ...imgAttrs } = props;

        const emitSrcSet = width != null || height != null || srcSetMutation != null;

        return (
          <img
            src={toImageSrc(props, storageId)}
            srcSet={emitSrcSet ? toImageSrcset(props, storageId, maxDPR) : undefined}
            width={width != null ? `${width}px` : undefined}
            height={height != null ? `${height}px` : undefined}
            alt=""
            {...imgAttrs}
          />
        );
      }}
    </Consumer>
  );
}

function toImageSrc(props: ImgProps, storageId: string): string {
  const { src, width, height, srcMutation } = props;

  const mutation = srcMutation == null ? toSizeMutation(width, height) : srcMutation;

  return toFileUrl(storageId, src, mutation);
}

function toImageSrcset(props: ImgProps, storageId: string, maxDPR: number): string {
  const { src, srcSetMutation } = props;
  if (srcSetMutation != null) {
    return Object.keys(srcSetMutation)
      .map(key => `${toFileUrl(storageId, src, srcSetMutation[key])} ${key}`)
      .join(',');
  }

  const { width, height } = props;

  return Array.from({ length: Math.floor(maxDPR) }, (_, i) => i + 1)
    .map(dpr => `${toFileUrl(storageId, src, toSizeMutation(width, height, dpr))} ${dpr}x`)
    .join(',');
}
