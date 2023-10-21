import React, { useEffect, useState, useRef } from "react";

import "./editor.css";

import Codemirror from "codemirror";

// importing code mirror css files for different themes
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/base16-dark.css";

// importing code mirror js files for different languages
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';

// importing code mirror files for additional functionality
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

function Editor() {
  const [code, setCode] = useState(""); // State to store the code
  const [locked, setLocked] = useState(false); // State to manage lock/unlock
  const [selecTheme, setSelecTheme] = useState("dracula"); //State to manage themes
  const [selecLang, setSelecLang] = useState("java"); //State to manage themes
  const [cmInst, setCminst] = useState(null); //State to manage codemirror instance
  const editorRef = useRef(null);

  useEffect(() => {
    if (!cmInst) {
      const CM = Codemirror.fromTextArea(
        document.getElementById("editorbody"),
        {
          value: code,
          mode: selecLang, //selected language(from dropdown)
          theme: selecTheme, //selected theme(frpm dropdown)
          autoCloseTags: true,
          lint: true,
          autoCloseBrackets: true,
          lineWrapping: true,
          lineNumbers: true,
          readOnly: locked,
        }
      );
      setCminst(CM);
    } else {
      cmInst.setOption("readOnly", locked);
      cmInst.setOption("theme", selecTheme);
      cmInst.setOption("mode", selecLang);
    }
  }, [locked, selecTheme, selecLang, cmInst]);

  const handleCopy = () => {
    if (cmInst) {
      const code = cmInst.getValue();
      console.log(code);
      copyTextToClipboard(code); // Copy the code to the clipboard
      alert("Code copied to clipboard!!");
    }
  };

  const copyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    console.log(textArea.value);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const handleSave = () => {
    if (cmInst) {
      const code = cmInst.getValue();
      const blob = new Blob([code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      var fileName = "Code.js"; //files will be save as code.js

      const dnLink = document.createElement("a");
      dnLink.href = url;
      dnLink.download = fileName;
      dnLink.style.display = "none";

      document.body.appendChild(dnLink);
      dnLink.click();

      URL.revokeObjectURL(url);
      document.body.removeChild(dnLink);
    }
  };

  const toggleLock = () => {
    setLocked(!locked);
  };

  const handleThemeChange = (event) => {
    setSelecTheme(event.target.value); // Update the selected theme
    console.log(event.target.value);
  };

  const handleLangChange = (event) => {
    setSelecLang(event.target.value); //Update selected language
    console.log(event.target.value);
  };

  return (
    <div className="editor">
      {/* Code editor header */}
      <div className="editor__header">
        <div className="editor__logo">CodeEditor</div>
        <div className="editor__menuTop">
          <select
            className="editor__menuTop-lang"
            id="chnglang"
            value={selecLang}
            onChange={handleLangChange}
          >
            <option selected>Choose Language</option>
            <option value="text/x-java">Java</option>
            <option value="text/x-csrc">C</option>
            <option value="text/x-c++src">CPP</option>
            <option value="xml">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>
          <select
            className="editor__menuTop-themes"
            id="chngTheme"
            value={selecTheme}
            onChange={handleThemeChange}
          >
            <option value="dracula" selected>Dracula</option>
            <option value="base16-light">Base 16-light</option>
            <option value="base16-dark">Base 16-dark</option>
            <option value="duotone-light">Duotone Light</option>
            <option value="duotone-dark">Duotone Dark</option>
          </select>
        </div>
      </div>
      {/* Code Editor coding area */}
      <textarea ref={editorRef} id="editorbody"></textarea>
      <div className="editor__menuBottom">
        <button onClick={handleCopy} className="editor__menuBottom-button">
          Copy
        </button>
        <button onClick={handleSave} className="editor__menuBottom-button">
          Save
        </button>
        <button onClick={toggleLock} className="editor__menuBottom-button">
          {locked ? "Unlock" : "Lock"}
        </button>
      </div>
    </div>
  );
}

export default Editor;

// Done:
// save*
// copy*
// lock/unlock*

// ToDo:
// Theme => base 16-light&dark, solarized light&dark,
// Diff Languages
// Download diff ext
