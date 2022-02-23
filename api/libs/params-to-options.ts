import type { URLSearchParams } from 'url'

export interface Options {
  format: 'png' | 'jpeg' | 'webp' | 'html',
  type: string,
  repository?: string,
  title?: string,
  description?: string,
  iconify?: string,
  gravatar?: string,
  url?: string,
}

export interface IssueOptions extends Options {
  type: 'issue',
  repository: string,
  title: string,
  description: string,
  author: string,
}

export function paramsToOptions(params: URLSearchParams): Options {
  const options: Record<string, any> = {}

  for (const [key, value] of params) {
    options[key] = value
  }

  return options as Options
}
