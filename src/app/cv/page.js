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

// Applied after escaping, so the captured text is already HTML-safe.
function formatEmphasis(escaped) {
  return escaped.replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function formatInline(text) {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let result = '';
  let lastIndex = 0;
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    result += formatEmphasis(escapeHtml(text.slice(lastIndex, match.index)));
    result += `<a href="${escapeAttr(match[2])}" target="_blank" rel="noopener noreferrer">${formatEmphasis(escapeHtml(match[1]))}</a>`;
    lastIndex = match.index + match[0].length;
  }

  result += formatEmphasis(escapeHtml(text.slice(lastIndex)));
  return result;
}

// Two spaces of indent per nesting level, matching how the source markdown is written.
const INDENT_WIDTH = 2;

function cvMarkdownToHtml(markdown) {
  const lines = markdown.split('\n');
  const parts = [];
  // One entry per open <ul>, holding that list's indent level. A nested list is
  // emitted inside the <li> that introduced it, so `liOpen` tracks whether the
  // deepest list currently has an unclosed <li>.
  const openLists = [];
  let liOpen = false;

  const closeLists = () => {
    while (openLists.length > 0) {
      if (liOpen) parts.push('</li>');
      openLists.pop();
      parts.push('</ul>');
      liOpen = openLists.length > 0;
    }
    liOpen = false;
  };

  for (const line of lines) {
    const bullet = /^( *)- (.*)$/.exec(line);

    if (bullet) {
      const level = Math.floor(bullet[1].length / INDENT_WIDTH);

      while (openLists.length > 0 && openLists.at(-1) > level) {
        if (liOpen) parts.push('</li>');
        openLists.pop();
        parts.push('</ul>');
        liOpen = true;
      }

      if (openLists.length === 0 || openLists.at(-1) < level) {
        parts.push('<ul>');
        openLists.push(level);
        liOpen = false;
      } else if (liOpen) {
        parts.push('</li>');
        liOpen = false;
      }

      parts.push(`<li>${formatInline(bullet[2])}`);
      liOpen = true;
      continue;
    }

    closeLists();

    if (line.startsWith('# ')) {
      parts.push(`<h1>${formatInline(line.slice(2))}</h1>`);
    } else if (line.startsWith('## ')) {
      parts.push(`<h2>${formatInline(line.slice(3))}</h2>`);
    } else if (line.startsWith('### ')) {
      parts.push(`<h3>${formatInline(line.slice(4))}</h3>`);
    } else if (line.trim() !== '') {
      parts.push(`<p>${formatInline(line)}</p>`);
    }
  }

  closeLists();
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
