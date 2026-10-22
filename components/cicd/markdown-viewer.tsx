'use client';

import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AlertCircle, FileText, Loader2 } from 'lucide-react';

export type DocFile = {
  path: string;
  label: string;
  group: string;
};

type MarkdownViewerProps = {
  files: DocFile[];
  basePath: string;
  initialFile?: string;
};

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-foreground mt-6 mb-3 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-foreground mt-6 mb-2 pb-1 border-b border-border">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-bold text-foreground mt-4 mb-1.5">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-sm font-bold text-foreground mt-3 mb-1">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-foreground/90 my-2">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 my-2 space-y-1 text-sm text-foreground/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 my-2 space-y-1 text-sm text-foreground/90">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 hover:text-primary/80"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary/40 pl-3 my-3 text-sm text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-5 border-border" />,
  code: ({ className, children }) =>
    className ? (
      <code className="font-mono text-[12px]">{children}</code>
    ) : (
      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="my-3 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-[12px] leading-relaxed text-slate-100">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto">
      <table className="w-full border-collapse text-[12px]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border bg-muted px-2 py-1.5 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-2 py-1.5 align-top text-foreground/85">{children}</td>
  ),
};

export default function MarkdownViewer({ files, basePath, initialFile }: MarkdownViewerProps) {
  const initialIndex = useMemo(() => {
    const idx = files.findIndex((f) => f.path === initialFile);
    return idx >= 0 ? idx : 0;
  }, [files, initialFile]);

  const [active, setActive] = useState(initialIndex);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const file = files[active];
    setLoading(true);
    setError(null);

    fetch(`${basePath}/${file.path}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) {
          setContent(text);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load document');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [active, basePath, files]);

  return (
    <div className="flex h-full min-h-0 bg-card border border-border rounded-xl overflow-hidden">
      <aside className="w-60 flex-shrink-0 border-r border-border bg-muted/40 overflow-y-auto">
        <div className="p-2">
          {files.map((file, idx) => {
            const showGroup = idx === 0 || files[idx - 1].group !== file.group;
            return (
              <div key={file.path}>
                {showGroup ? (
                  <p className="px-2 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {file.group}
                  </p>
                ) : null}
                <button
                  onClick={() => setActive(idx)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                    idx === active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-[12px] font-semibold truncate">{file.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border flex-shrink-0">
          <span className="text-[12px] font-mono font-semibold text-foreground truncate">
            {files[active].path}
          </span>
          <span className="text-[11px] text-muted-foreground flex-shrink-0 pl-3">Markdown</span>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {loading ? (
            <div className="h-full flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading document…
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center gap-2 text-red-600 dark:text-red-400 text-sm px-6 text-center">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          ) : (
            <article className="px-6 py-4 max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {content}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
