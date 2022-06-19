import { getImageUrl } from '../_utils/get-image-url'
import type { IssueOptions } from '../_libs/params-to-options'

export function makeIssueTemplate(options: IssueOptions) {
  const avatarUrl = getImageUrl(options)

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>

  <style>
    body {
      width: 1200px;
      height: 630px;
      margin: 0;
      background-color: white;

      font-family: Pretendard, sans-serif;
      font-weight: 400;
      font-size: 32px;
      color: #343a40;
    }

    p {
      margin: 0;
    }

    .container {
      display: grid;
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      grid-template-rows: repeat(12, 1fr);
      grid-template-columns: repeat(12, 1fr);
      grid-gap: 0.25rem;
    }

    .tag {
      display: inline-grid;
      grid-column: 2 / span 8;
      grid-row: 3;
      justify-content: flex-start;
      align-items: center;

      font-size: 0.6em;
      color: #495057;
    }

    .content {
      grid-column: 2 / span 8;
      grid-row: 4 / span 6;
      margin: 0;
    }

    .content > .title,
    .content > .description {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      word-break: keep-all;
    }

    .title {
      max-height: 210px;
      -webkit-line-clamp: 3;

      line-height: 1;
      font-weight: 700;
      font-size: 2em;
    }

    .title span {
      vertical-align: text-top;
    }

    .description {
      height: 103px;
      margin-top: 47px;
      -webkit-line-clamp: 3;
      line-height: 1.25;
      font-size: 0.8em;
      color: #495057;
    }

    .description span {
      vertical-align: text-top;
    }

    .image {
      display: inline-grid;
      grid-column: 10 / span 2;
      grid-row: 3 / span 5;
    }

    .image img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }

    .author {
      grid-column: 2  / span 8;
      grid-row: 11;

      font-size: 0.5em;
    }

    .author-container > * {
      vertical-align: middle;
    }

    .author img {
      width: 2.5em;
      height: 2.5em;
      margin-right: 0.5em;
      border-radius: 50%;
    }

    .color-bar {
      display: grid;
      grid-column: span 12;
      grid-row: 12;
      justify-content: flex-start;
      align-items: flex-end;
    }

    .color-bar::after {
      width: 1200px;
      height: 24px;
      content: '';

      background-color: ${options.color_bar ?? '#ffffff'};
    }
  </style>
</head>
<body>
<div class="container">
  <div class="tag">
    ${options.repository ?? ''}
  </div>
  <div class="content">
    <p class="title">
      <span>${options.title}</span>
    </p>

    <div class="description">
      <span>${options.description ?? ''}</span>
    </div>
  </div>

  <div class="image">
    <img src="${options.image ?? ''}" alt="" />
  </div>

  <div class="author">
    <div class="author-container">
      <img src="${avatarUrl}" alt="" />
      <span>
          <b>${options.author ?? ''}</b> · ${options.date ?? ''}
        </span>
    </div>
  </div>

  <div class="color-bar"></div>
</div>
</body>
</html>`
}
