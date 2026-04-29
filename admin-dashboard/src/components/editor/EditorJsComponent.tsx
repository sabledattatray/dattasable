'use client';
import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import ImageTool from '@editorjs/image';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import CodeTool from '@editorjs/code';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import Warning from '@editorjs/warning';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import RawTool from '@editorjs/raw';
// @ts-ignore
import ColorPlugin from 'editorjs-text-color-plugin';
interface EditorProps {
  data?: OutputData | string;
  onChange: (data: OutputData) => void;
}

class SafeColorPlugin extends (ColorPlugin as any) {
  constructor(options: any) {
    const safeConfig = {
      colorCollections: [
        '#EC7878', '#9C27B0', '#673AB7', '#3F51B5', '#0070FF', '#03A9F4', 
        '#00BCD4', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', 
        '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#000000', '#FFFFFF'
      ],
      defaultColor: '#FF1300',
      type: 'text',
      ...(options.config || {})
    };
    options.config = safeConfig;
    super(options);
    
    // Forcibly inject config to bypass plugin context loss
    this.config = safeConfig;
    this.colorCollections = safeConfig.colorCollections;
  }
}

class SafeHighlightPlugin extends (ColorPlugin as any) {
  constructor(options: any) {
    const safeConfig = {
      colorCollections: [
        '#FFEB3B', '#FCE4EC', '#E8EAF6', '#E0F2F1', '#FFF3E0', '#ECEFF1'
      ],
      defaultColor: '#FFEB3B',
      type: 'marker',
      ...(options.config || {})
    };
    options.config = safeConfig;
    super(options);
    
    // Forcibly inject config to bypass plugin context loss
    this.config = safeConfig;
    this.colorCollections = safeConfig.colorCollections;
  }
}

const EditorJsComponent: React.FC<EditorProps> = ({ data, onChange }) => {
  const ejInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      if (ejInstance.current && ejInstance.current.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initEditor = () => {
    let parsedData: OutputData | undefined = undefined;
    if (data) {
      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          // If it's a simple string, format it as a paragraph block
          parsedData = {
            time: new Date().getTime(),
            blocks: [{ type: 'paragraph', data: { text: data } }],
            version: '2.30.7'
          };
        }
      } else {
        parsedData = data;
      }
    }

    const editor = new EditorJS({
      holder: 'editorjs',
      data: parsedData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        if (!ejInstance.current) return;
        const content = await ejInstance.current.save();
        onChange(content);
      },
      tools: {
        header: {
          class: Header as any,
          inlineToolbar: true,
          config: {
            levels: [2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        marker: Marker,
        inlineCode: InlineCode,
        image: {
          class: ImageTool as any,
          config: {
            endpoints: {
              byFile: '/api/upload', 
              byUrl: '/api/fetchUrl',
            }
          }
        },
        embed: {
          class: Embed as any,
          config: {
            services: {
              youtube: true,
              coub: true,
              codepen: true,
              imgur: true,
              twitter: true,
              github: true,
              vimeo: true,
            }
          }
        },
        table: {
          class: Table as any,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        code: CodeTool as any,
        delimiter: Delimiter as any,
        warning: {
          class: Warning as any,
          inlineToolbar: true,
          config: {
            titlePlaceholder: 'Warning title',
            messagePlaceholder: 'Message',
          },
        },
        linkTool: {
          class: LinkTool as any,
          config: {
            endpoint: '/api/link-preview', 
          }
        },
        raw: RawTool as any,
        Color: {
          class: SafeColorPlugin as any,
        },
        Highlight: {
          class: SafeHighlightPlugin as any,
        },
      },
      placeholder: 'Start writing your story...',
    });
  };

  return (
    <div 
      id="editorjs" 
      style={{ 
        minHeight: '400px', 
        fontSize: '1.15rem', 
        lineHeight: 1.8, 
        color: 'var(--mui-palette-text-secondary)' 
      }} 
    />
  );
};

export default EditorJsComponent;
