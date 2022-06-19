import { URL } from 'url'
import { basename, extname } from 'path'
import type { VercelRequest, VercelResponse } from '@vercel/node'

import { makeIssueTemplate } from './templates/issue'

import { paramsToOptions } from './libs/params-to-options'
import type { IssueOptions } from './libs/params-to-options'
import { renderImage } from './libs/render-image'

const SUPPORT_IMAGE_FORMATS = ['png', 'svg', 'html']
const SUPPORT_TYPES = ['issue']

export default async (req: VercelRequest, res: VercelResponse) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`)
  const params = url.searchParams
  
  const filename = basename(url.pathname)
  const format = extname(filename).replace(/^\./, '')
  const title = decodeURIComponent(filename.replace(format, ''))

  // 미지원 포맷
  if (!SUPPORT_IMAGE_FORMATS.includes(format)) {
    console.error('Not Support image format: ' + format)
    return error(400)
  }

  if (!SUPPORT_TYPES.includes(params.get('type') || '')) {
    console.error('Not support types: ' + params.get('type'))
    console.info(SUPPORT_TYPES)
    return error(400)
  }

  const options = paramsToOptions(params)
  options.title = title
  options.format = format as 'png' | 'jpeg' | 'webp' | 'html'

  let html: string | undefined = undefined

  if (options.type === 'issue') {
    html = makeIssueTemplate(options as IssueOptions)
  }

  if (html === undefined) {
    console.error('Create HTML Error')
    return error(500)
  }

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
