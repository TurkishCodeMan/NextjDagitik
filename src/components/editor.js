import React from "react";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function Editor({
  onChange = () => {},
  readOnly = false,
  data = undefined,
}) {
  const editor = React.useRef(null);

  const EDITOR_JS_TOOLS = {
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,

    image: {
      class: Image,
      config: {
        uploader: {
          async uploadByFile(file) {
            const formData = new FormData();

            formData.append("upload_preset", "my-uploads");

            formData.append("file", file);
            const base64File = await toBase64(file);
            return fetch(
              "https://api.cloudinary.com/v1_1/dsoogenxt/image/upload",
              {
                method: "POST",
                body: formData,
              }
            )
              .then((res) => res.json())
              .then((result) => {
                console.log(result);
                return {
                  success: 1,
                  file: {
                    url: result.url,
                    // any other image data you want to store, such as width, height, color, extension, etc
                  },
                };
              });

            // return {
            //   success: 1,
            //   file: {
            //     url: base64File,
            //     // any other image data you want to store, such as width, height, color, extension, etc
            //   },
            // };
          },
        },
      },
    },

    raw: Raw,
    header: Header,
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
  };

  React.useEffect(() => {
    const editorjs = new EditorJS({
      tools: EDITOR_JS_TOOLS,
      holder: "editorjs",
      data: data ? data : {},
      autofocus: true,
      placeholder: "Let it be known.",
      withBorder: true,
      readOnly,
      holder: "editorjs",
      onChange: (val) => onChange(editor, val),
    });
    editor.current = editorjs;

    return () => {
      if (editor.current) {
        try {
          editor.current.destroy();
        } catch {
          console.warn("error destroying editor");
        }
      }
    };
  }, []);
  return <div id="editorjs" style={{ width: "100%", height: "100%" }}></div>;
}
