import { useEffect, useState } from 'react';
import { POSTS } from './content';

const RSS_URL = 'https://basics-css.hashnode.dev/rss.xml';
const GRADIENTS = [
  'from-orange-500 via-amber-600 to-stone-800',
  'from-stone-800 via-orange-700 to-amber-500',
  'from-amber-500 via-orange-600 to-red-700',
  'from-orange-600 via-stone-700 to-stone-900',
  'from-stone-900 via-neutral-700 to-orange-600'
];

function stripHtml(s = '') {
  return s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").trim();
}

function parseRss(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  const items = [...doc.querySelectorAll('item')].map((item, i) => {
    const title = item.querySelector('title')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '#';
    const pubDate = item.querySelector('pubDate')?.textContent;
    const desc = stripHtml(item.querySelector('description')?.textContent || '');
    const date = pubDate ? new Date(pubDate) : null;
    return {
      slug: link,
      title,
      excerpt: desc.slice(0, 140) + (desc.length > 140 ? '…' : ''),
      date: date ? date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
      year: date ? String(date.getFullYear()) : '',
      views: '',
      readTime: '',
      tag: 'Blog',
      link,
      gradient: GRADIENTS[i % GRADIENTS.length]
    };
  }).filter(p => p.title && p.link !== '#');
  return items;
}

/* Merges live Hashnode RSS posts with local fallback posts */
export function usePosts() {
  const [posts, setPosts] = useState(POSTS);

  useEffect(() => {
    fetch(RSS_URL)
      .then(r => (r.ok ? r.text() : Promise.reject()))
      .then(parseRss)
      .then(items => { if (items.length) setPosts(items); })
      .catch(() => {});
  }, []);

  return posts;
}
