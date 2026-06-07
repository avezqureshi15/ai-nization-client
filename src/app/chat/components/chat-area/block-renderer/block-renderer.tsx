// block-renderer.tsx

import React from "react";
import AIMessage from "../../../../../components/ui/ai-message/ai-message";
import ThinkingChip from "./blocks/thinking/thinking";
import ComposeEmail from "./blocks/compose-email/compose-email";
import TextArea from "./blocks/text-area/text-area";
import type { CodeBlock, EmailBlock, ImageBlock, LetterBlock, MarkdownBlock, TextBlock, ThinkingBlock } from "../chart-area.type";
import MarkdownRenderer from "./blocks/markdown/markdown";


type RendererMap = {
  text: (block: TextBlock, key: number) => React.ReactNode;
  thinking: (block: ThinkingBlock, key: number) => React.ReactNode;
  code: (block: CodeBlock, key: number) => React.ReactNode;
  image: (block: ImageBlock, key: number) => React.ReactNode;
  email: (block: EmailBlock, key: number) => React.ReactNode;
  letter: (block: LetterBlock, key: number) => React.ReactNode;
  markdown: (block: MarkdownBlock, key: number) => React.ReactNode;
};

export const blockRendererMap: RendererMap = {
  text: (block, key) => (
    <AIMessage key={key} message={block.text} />
  ),

  thinking: (block, key) => (
    <ThinkingChip key={key} text={block.text} />
  ),

  code: (block, key) => (
    <pre key={key} style={{ background: "#111", padding: 12 }}>
      {block.code}
    </pre>
  ),

  image: (block, key) => (
    <img
      key={key}
      src={block.url}
      alt=""
      style={{ maxWidth: "100%", borderRadius: 8 }}
    />
  ),

  email: (block, key) => (
    <ComposeEmail
      key={key}
      // future ready
      // subject={block.subject}
      // body={block.body}
    />
  ),

  letter: (block, key) => (
    <TextArea
      key={key}
      subject={block.subject}
      name={block.name}
      meta={block.meta}
    />
  ),

  markdown: (block: MarkdownBlock, key) => (
  <MarkdownRenderer key={key} content={block.content} />
),
};