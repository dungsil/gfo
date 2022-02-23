import { getAvatarUrl } from '../utils/get-avatar-url'
import type { IssueOptions } from '../libs/params-to-options'

export function makeIssueTemplate(options: IssueOptions) {
  const avatarUrl = getAvatarUrl(options)

  return `<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Document</title>

    <style>
        body {
            position: relative;
            display: flex;
            width: 1200px;
            height: 630px;
            margin: 0;
            padding-top: 70px;
            background-color: #fff;
            box-sizing: border-box;

            font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
            font-weight: 400;
            font-size: 17px;
            line-height: 1.5;
            letter-spacing: 0.0625em;
        }

        h1,p {
            margin: 0;
        }

        .text-container {
            position: absolute;
            top: 70px;
            left: 70px;
        }

        .image-container {
            position: absolute;
            top: 96px;
            right: 35px;
        }

        #repository {
        }

        #title,
        #description {
            display: -webkit-box;
            word-break: keep-all;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        #title {
            max-width: 700px;
            height: 150px;

            font-size: 50px;
            font-weight: 700;
        }

        #description {
            max-width: 700px;
            margin-top: 30px;
        }

        #created {
            position: absolute;
            left: 70px;
            bottom: 40px;
            line-height: 60px;
        }

        #created > img,
        #created b {
            vertical-align: middle;
        }

        #created b {
            margin-left: 0.5em;
        }

        #bar {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 20px;
            background-color: blue;
        }
    </style>
</head>
<body>
    <div class="text-container">
        <p id="repository">${options.repository}</p>
        <h1 id="title">${options.title}</h1>
        <p id="description">${options.description}</p>
    </div>

    <div class="image-container">
        <img src="${avatarUrl}" width="200" height="200" alt="" />
    </div>

    <div id="created">
        <img src="${avatarUrl}" width="60" height="60" alt="" />
        <b>${options.author}</b>
    </div>

    <div id="bar"></div>
</body>
</html>`
}
