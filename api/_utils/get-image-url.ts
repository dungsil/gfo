import type { Options } from '../_libs/params-to-options'
import md5 from 'md5'

export function getImageUrl(option: Options) {
  if (option.iconify) {
    return `https://api.iconify.design/${encodeURIComponent(option.iconify).replace('%3A', '/')}.svg?width=200`
  }

  if (option.gravatar) {
    return `https://www.gravatar.com/avatar/${md5(option.gravatar)}?s=200`
  }

  if (option.url) {
    return option.url
  }
}
