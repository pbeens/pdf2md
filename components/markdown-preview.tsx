"use client"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownPreviewProps {
  markdown: string
  className?: string
}

export function MarkdownPreview({ markdown, className }: MarkdownPreviewProps) {
  return (
    <Card className="border rounded-md overflow-hidden">
      <ScrollArea className="h-[600px] w-full">
        <div className="p-6">
          <div className={cn("prose dark:prose-invert max-w-none break-words", className)}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre: ({ node, ...props }) => (
                  <pre
                    {...props}
                    className="overflow-x-auto p-4 bg-muted rounded-md my-4 text-sm [overflow-wrap:anywhere]"
                  />
                ),
                code: ({ node, inline, ...props }: any) => (
                  <code
                    {...props}
                    className={cn(
                      "text-sm",
                      inline
                        ? "bg-muted px-1 py-0.5 rounded break-words"
                        : "block overflow-x-auto [overflow-wrap:anywhere]"
                    )}
                  />
                ),
                table: ({ children }) => (
                  <div className="my-4 overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 table-auto">
                      {children}
                    </table>
                  </div>
                ),
                img: ({ src, alt }) => (
                  <div className="overflow-hidden">
                    <img src={src || "/placeholder.svg"} alt={alt} className="max-w-full h-auto" />
                  </div>
                ),
                p: ({ children }) => (
                  <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{children}</p>
                ),
                a: ({ node, href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words [overflow-wrap:anywhere]"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
}
