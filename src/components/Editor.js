import React, { useEffect, useState, useRef } from "react";
import "./editor.css";
import Codemirror from 'codemirror';
// import { Controlled as ControlledEditor } from "react-codemirror2";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets'

function Editor() {
  const [code, setCode] = useState(""); // State to store the code
  const [locked, setLocked] = useState(false); // State to manage lock/unlock
  const [theme, setTheme] = useState(true);
  const [cmInst, setCminst] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if(!cmInst){
        const CM = Codemirror.fromTextArea(document.getElementById('editorbody'),{
            value: code,
            mode: {name: 'javascript', json:true},
            theme: 'dracula',
            autoCloseTags: true,
            lint: true,
            autoCloseBrackets: true,
            lineWrapping: true,
            lineNumbers: true,
            readOnly: locked
        });
        setCminst(CM);
    } else{
        cmInst.setOption('readOnly', locked);
    }
  },[locked, cmInst])

  const handleCopy = () => {
    if (cmInst) {
      const code = cmInst.getValue();
      console.log(code);
      copyTextToClipboard(code); // Copy the code to the clipboard
      alert('Code copied to clipboard!!');
    }
  };

  const copyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    console.log(textArea.value);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const handleSave = () => {
    
  };

  const toggleLock = () => {
    setLocked(!locked);
  };
  const toggleTheme = () => {
    setTheme(!theme);
  };

  

  return (
    <div className="editor">
        {/* Code editor header */}
      <div className="editor__header">
        <div className="editor__logo">CodeEditor</div>
        <div className="editor__nav">
          <button onClick={handleCopy} className="editor__nav-button">
            Copy
          </button>
          <button onClick={handleSave} className="editor__nav-button">
            Save
          </button>
          <button onClick={toggleLock} className="editor__nav-button">
            {locked ? "Unlock" : "Lock"}
          </button>
          <button onClick={toggleTheme} className="editor__nav-button">
            Change Theme
          </button>
        </div>
      </div>
      {/* Code Editor coding area */}
        <textarea ref={editorRef} id="editorbody"></textarea>
    </div>
  );
}

export default Editor;
