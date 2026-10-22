'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, FileCode, Loader2 } from 'lucide-react';

export type CodeFile = {
  path: string;
  label: string;
  note?: string;
};

type CodeViewerProps = {
  files: CodeFile[];
  basePath: string;
  initialFile?: string;
  title?: string;
};

export default function CodeViewer({ files, basePath, initialFile, title }: CodeViewerProps) {
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
          setError(err instanceof Error ? err.message : 'Failed to load file');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [active, basePath, files]);

  const lineCount = content ? content.replace(/\r\n/g, '\n').split('\n').length : 0;

  return (
    <div className="flex h-full min-h-0 bg-card border border-border rounded-xl overflow-hidden">
      <aside className="w-64 flex-shrink-0 border-r border-border bg-muted/40 overflow-y-auto">
        {title ? (
          <p className="px-3 pt-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
        ) : null}
        <div className="p-2 space-y-1">
          {files.map((file, idx) => (
            <button
              key={file.path}
              onClick={() => setActive(idx)}
              className={`w-full text-left px-2.5 py-2 rounded-md transition-colors ${
                idx === active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-[12px] font-mono font-semibold truncate">{file.path}</span>
              </span>
              {file.note ? (
                <span
                  className={`block pl-5 text-[11px] leading-snug mt-0.5 ${
                    idx === active ? 'text-primary-foreground/75' : 'text-muted-foreground'
                  }`}
                >
                  {file.note}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border flex-shrink-0">
          <span className="text-[12px] font-mono font-semibold text-foreground truncate">
            {files[active].path}
          </span>
          <span className="text-[11px] text-muted-foreground flex-shrink-0 pl-3">
            {lineCount} lines
          </span>
        </div>

        <div className="flex-1 min-h-0 overflow-auto bg-slate-950">
          {loading ? (
            <div className="h-full flex items-center justify-center gap-2 text-slate-300 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading file...
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center gap-2 text-red-300 text-sm px-6 text-center">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          ) : (
            <pre className="p-4 text-[12.5px] leading-[1.55] font-mono text-slate-100 whitespace-pre-wrap break-words">
              <code>{content}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
