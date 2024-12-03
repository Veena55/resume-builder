import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ placeholder, name, onBlur }) => {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html) => {
    const name = "a_descp";
    setEditorHtml(html);
  };
  return (
    <div>
      <ReactQuill placeholder={placeholder}
        onBlur={onBlur}
        name={name}
        value={editorHtml}
        onChange={handleChange}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
      />
    </div>
  );
};

TextEditor.modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['direction', { 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

TextEditor.formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'color', 'background',
  'script', 'header', 'blockquote', 'code-block',
  'list', 'bullet', 'indent', 'direction', 'align',
  'link', 'image', 'video'
];

export default TextEditor;
