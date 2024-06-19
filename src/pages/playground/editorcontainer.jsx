import React, { useContext, useState, useEffect, useRef } from 'react';
import './editorcontainer.scss';
import { AiOutlineEdit } from "react-icons/ai";
import { TfiImport, TfiExport } from "react-icons/tfi";
import { MdOutlineFullscreen } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import Editor from '@monaco-editor/react';
import SimpleCodeEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism.css';
import { Playgroundcontext, defaultCodes } from '../../providers/playprovider';
import { IoIosArrowBack } from "react-icons/io";

const languageMap = {
    javascript: 'javascript',
    cpp: 'clike',
    java: 'java',
    python: 'python',
};

function Editorcontainer({ fileId, folderId, initialLanguage, runcode }) {
    const { getDefaultcode, saveCode, getFileTitle } = useContext(Playgroundcontext);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState(initialLanguage || 'javascript');
    const [theme, setTheme] = useState('vs-dark');
    const [isSaved, setIsSaved] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [editorType, setEditorType] = useState('simple');
    const [fileTitle, setFileTitle] = useState('Untitled');
    const editorRef = useRef(null);

    useEffect(() => {
        const defaultCode = getDefaultcode(fileId, folderId);
        setCode(defaultCode);
    }, [fileId, folderId, getDefaultcode]);

    useEffect(() => {
        setLanguage(initialLanguage || 'javascript');
    }, [initialLanguage]);

    useEffect(() => {
        const title = getFileTitle(fileId, folderId);
        setFileTitle(title);
    }, [fileId, folderId, getFileTitle]);

    const onChangeCode = (newCode) => {
        setCode(newCode);
    };

    const onUpload = (e) => {
        const file = e.target.files[0];
        const fileType = file.type.includes('text');
        if (fileType) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = function (value) {
                const importedCode = value.target.result;
                setCode(importedCode);
            };
        } else {
            alert('Please choose a text file');
        }
    };

    const editorOptions = {
        wordWrap: 'on',
        scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
        },
        minimap: {
            enabled: true,
        },
        lineNumbers: 'on',
        renderLineHighlight: 'none',
    };

    const onChangeLanguage = (e) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage);
        setCode(defaultCodes[newLanguage] || '');
    };

    const onChangeTheme = (e) => {
        setTheme(e.target.value);
    };

    const exportCode = () => {
        if (!code.trim()) {
            alert('Please enter something in the editor');
            return;
        }

        const fileExtension = {
            'javascript': 'js',
            'cpp': 'cpp',
            'java': 'java',
            'python': 'py'
        }[language] || 'txt';

        const fileName = `code.${fileExtension}`;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };

    const saveCurrentCode = () => {
        saveCode(fileId, folderId, code);
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 2000);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    };

    const onRunCode = () => {
        console.log('Running code...');
        runcode({ code, language });
    };

    const toggleEditorType = () => {
        const nextEditor = editorType === 'monaco' ? 'simple' : 'monaco';
        setEditorType(nextEditor);
    };

    const renderEditor = () => {
        if (editorType === 'monaco') {
            return (
                <Editor
                    height={'100%'}
                    width={'100%'}
                    language={language}
                    theme={theme}
                    onChange={onChangeCode}
                    value={code}
                    options={editorOptions}
                />
            );
        } else if (editorType === 'simple') {
            const prismLanguage = languageMap[language];
            if (!prismLanguage || !languages[prismLanguage]) {
                console.warn(`PrismJS doesn't support language '${language}'.`);
                return null;
            }

            return (
                <SimpleCodeEditor
                    className="code-editor"
                    value={code}
                    onValueChange={onChangeCode}
                    highlight={(code) => highlight(code, languages[prismLanguage])}
                    padding={10}
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 15,
                        height: '100%',
                        width: '100%',
                        overflow: 'auto',
                        border: 'none',
                        outline: 'none',
                        background: theme === 'vs-dark' ? '#1e1e1e' : '#fff',
                        color: theme === 'vs-dark' ? '#d4d4d4' : '#000',
                    }}
                />
            );
        }
        return null;
    };

    return (
        <div className={`editor-box ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className="editor-header">
                <div className="left">
                    <b className='title'>{fileTitle}</b> 
                    <button onClick={saveCurrentCode}>
                        {isSaved ? 'Saved' : 'Save Code'}
                    </button>
                    <span onClick={()=>navigate('/')} className='backbtn'><IoIosArrowBack/>back</span>
                </div>
                <div className="rigth">
                    <select onChange={onChangeLanguage} value={language}>
                        <option value="javascript">Javascript</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                    <select onChange={onChangeTheme} value={theme}>
                        <option value="vs-dark">Vs-dark</option>
                        <option value="light">Git-Light</option>
                    </select>
                    <button className='switchbtn' onClick={toggleEditorType}>
                        {editorType === 'monaco' ? 'Switch to Simple' : 'Switch to Monaco'}
                    </button>
                </div>
            </div>

            <div className="editor-body" ref={editorRef}>
                {renderEditor()}
            </div>

            <div className="editor-footer">
                <button onClick={toggleFullscreen}>
                    <span><MdOutlineFullscreen /></span>
                    <span>
                        {isFullscreen ? 'Minimize screen' : 'Full screen'}
                    </span>
                </button>
                <label htmlFor="importcode">
                    <span><TfiImport /></span>
                    <span>Import Code</span>
                </label>
                <input style={{ display: 'none' }} type="file" id='importcode' onChange={onUpload} />
                <button onClick={exportCode}>
                    <span><TfiExport /></span>
                    <span>Export Code</span>
                </button>
                <button className='runbtn' onClick={onRunCode}>
                    <span><FaPlay /></span>
                    <span>Run Code</span>
                </button>
            </div>
        </div>
    );
}

export default Editorcontainer;
