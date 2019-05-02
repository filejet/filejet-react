export function toFileUrl(storageId: string, src: string, mutation: string | null) {
  if (mutation === '') {
    if (isFileId(src)) return `https://${storageId}.5gcdn.net/${src}`;
    return src;
  }

  const normalizedMutation = normalizeMutation(mutation);
  if (isFileId(src)) return `https://${storageId}.5gcdn.net/${src}/${normalizedMutation}`;
  return `https://${storageId}.5gcdn.net/ext/${normalizedMutation}?src=${encodeURIComponent(src)}`;
}

export function toSizeMutation(width?: number, height?: number, dpr = 1): string | null {
  if (width != null && height != null) return `fit_${width * dpr}x${height * dpr}`;
  if (width != null && height == null) return `resize_${width * dpr}`;
  if (width == null && height != null) return `resize_x${height * dpr}`;
  return null;
}

function normalizeMutation(mutation: string | null): string {
  if (mutation == null) return 'auto';

  return [
    ...mutation
      .split(',')
      .filter(m => m !== 'auto')
      .map(m => m.trim()),
    'auto'
  ].join(',');
}

function isFileId(value: string): boolean {
  return value.length === 32 && value.match(/^[a-z0-9]*$/) != null;
}

/**
 * Extract all optional properties from T and turn them into required properties.
 */
export type ExtractOptional<T> = Required<Pick<T, OptionalKeys<T>>>;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type OptionalKeys<T> = { [K in keyof T]-?: ({} extends { [P in K]: T[K] } ? K : never) }[keyof T];
