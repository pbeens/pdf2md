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
          <div className={cn("prose dark:prose-invert max-w-none", className)}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre: ({ node, ...props }) => (
                  <pre
                    {...props}
                    className="overflow-auto p-4 bg-muted rounded-md my-4 text-sm whitespace-pre-wrap break-all"
                  />
                ),
                code: ({ node, inline, ...props }: any) => (
                  <code
                    {...props}
                    className={cn("text-sm", inline ? "bg-muted px-1 py-0.5 rounded" : "block overflow-x-auto")}
                  />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border-collapse border border-gray-300">{children}</table>
                  </div>
                ),
                img: ({ src, alt }) => (
                  <div className="overflow-hidden">
                    <img src={src || "/placeholder.svg"} alt={alt} className="max-w-full h-auto" />
                  </div>
                ),
                p: ({ children }) => <p className="whitespace-pre-wrap break-words">{children}</p>,
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
