import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Navbar from '@/components/Navbar';
import styles from './cv.module.css';

export const metadata = {
  title: 'CV',
  description: 'Reuben Roy — software engineer resume, work history, and projects.',
};

const cvFilePath = path.join(process.cwd(), 'src', 'content', 'cv.md');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function formatInline(text) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let result = '';
  let lastIndex = 0;
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    result += escapeHtml(text.slice(lastIndex, match.index));
    result += `<a href="${escapeAttr(match[2])}" target="_blank" rel="noopener noreferrer">${escapeHtml(match[1])}</a>`;
    lastIndex = match.index + match[0].length;
  }

  result += escapeHtml(text.slice(lastIndex));
  return result;
}

function cvMarkdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const parts = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      parts.push('</ul>');
      inList = false;
    }
  };

  for (const line of lines) {
    if (line.startsWith('# ')) {
      closeList();
      parts.push(`<h1>${formatInline(line.slice(2))}</h1>`);
    } else if (line.startsWith('## ')) {
      closeList();
      parts.push(`<h2>${formatInline(line.slice(3))}</h2>`);
    } else if (line.startsWith('### ')) {
      closeList();
      parts.push(`<h3>${formatInline(line.slice(4))}</h3>`);
    } else if (line.startsWith('- ')) {
      if (!inList) {
        parts.push('<ul>');
        inList = true;
      }
      parts.push(`<li>${formatInline(line.slice(2))}</li>`);
    } else if (line.trim() === '') {
      closeList();
    } else {
      closeList();
      parts.push(`<p>${formatInline(line)}</p>`);
    }
  }

  closeList();
  return parts.join('\n');
}

export default async function CvPage() {
  const markdown = await readFile(cvFilePath, 'utf8');
  const html = cvMarkdownToHtml(markdown);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <article
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </div>
  );
}
