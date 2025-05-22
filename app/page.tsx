"use client"

import { useState } from "react"
import { FileUploader } from "@/components/file-uploader"
import { MarkdownPreview } from "@/components/markdown-preview"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Code } from "lucide-react"
import { FaqSection } from "@/components/faq-section"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GitHubStarButton } from "@/components/github-star-button"

export default function Home() {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  return (
    <main className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center sm:text-left">PDF to Markdown Converter</h1>
        <GitHubStarButton className="mt-2 sm:mt-0" />
      </div>

      <p className="text-center mb-8 text-muted-foreground">
        Upload a PDF file to convert it to Markdown format
        <span className="block text-xs mt-1 text-green-600 font-medium">
          100% browser-based - your files never leave your device
        </span>
      </p>

      <div className="grid gap-8">
        <FileUploader
          onConversionComplete={(result, file) => {
            setMarkdown(result)
            setFileName(file.name)
          }}
          isConverting={isConverting}
          setIsConverting={setIsConverting}
        />

        {markdown && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Conversion Result</h2>
              <Button
                onClick={() => {
                  if (!markdown || !fileName) return

                  const element = document.createElement("a")
                  const file = new Blob([markdown], { type: "text/markdown" })
                  element.href = URL.createObjectURL(file)
                  element.download = fileName.replace(/\.pdf$/i, "") + ".md"
                  document.body.appendChild(element)
                  element.click()
                  document.body.removeChild(element)
                }}
                variant="outline"
                size="sm"
              >
                Download Markdown
              </Button>
            </div>

            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="markdown" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Markdown
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
                <MarkdownPreview markdown={markdown} />
              </TabsContent>
              <TabsContent value="markdown" className="mt-4">
                <div className="relative">
                  <Card className="overflow-hidden">
                    <ScrollArea className="h-[600px] w-full">
                      <pre className="p-4 text-sm whitespace-pre-wrap break-words overflow-visible">
                        <code>{markdown}</code>
                      </pre>
                    </ScrollArea>
                  </Card>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => {
                      navigator.clipboard.writeText(markdown || "")
                      alert("Markdown copied to clipboard!")
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
      <FaqSection />

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <div className="flex justify-center mb-2">
          <GitHubStarButton />
        </div>
        <p>
          Made with ❤️ by <a href="https://twitter.com/michael_chomsky" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@michael_chomsky</a>. If you found this tool helpful, please consider starring it on
          GitHub.
        </p>
      </footer>
    </main>
  )
}
