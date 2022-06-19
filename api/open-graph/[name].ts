import { URL } from 'url'
import { basename, extname } from 'path'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { makeIssueTemplate } from '../_templates/issue'
import { paramsToOptions } from '../_libs/params-to-options'
import { renderImage } from '../_libs/render-image'
import type { IssueOptions } from '../_libs/params-to-options'

const SUPPORT_IMAGE_FORMATS = ['png', 'svg', 'html']

export default async (req: VercelRequest, res: VercelResponse) => {
  const url = new URL(req.url || '/', `https://${req.headers.host}`)
  const params = url.searchParams

  const filename = basename(url.pathname)
  const format = extname(filename).replace(/^\./, '')
  const title = decodeURIComponent(filename.replace(format, ''))

  // 미지원 포맷
  if (!SUPPORT_IMAGE_FORMATS.includes(format)) {
    console.error('Not Support image format: ' + format)
    return error(400)
  }

  const options = paramsToOptions(params) as IssueOptions
  options.title = title
  options.format = format as 'png' | 'jpeg' | 'webp' | 'html'

  const html = makeIssueTemplate(options)

  switch (options.format) {
    case 'html':
      res.send(html)
      break
    default:
      res.setHeader('Content-Type', 'image/' + options.format)
      res.setHeader('Cache-Control', 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000')
      res.setHeader('Access-Control-Allow-Origin', '*')

      res.send(await renderImage(html, options))
  }

  return res.end()

  function error(status: number) {
    res.statusCode = status
    res.end()
  }
}
