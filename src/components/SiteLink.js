import Link from 'next/link';

export function isExternalHref(href) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
}

export default function SiteLink({ href, children, ...props }) {
  if (isExternalHref(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
