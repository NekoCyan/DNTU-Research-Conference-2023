import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import './AboutStyles.css'

const markdown = `
# Header 1
## Header 2

_italic_

**bold**
`;

export default function About() {
  return (
    <div className='about pt-xxl'>
      <ReactMarkdown children={markdown} />
    </div>
  )
}
