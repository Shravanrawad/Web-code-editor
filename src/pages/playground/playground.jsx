import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../logo/image.png';
import './playground.scss';
import { TfiImport, TfiExport } from "react-icons/tfi";
import Editorcontainer from './editorcontainer';
import { Playgroundcontext } from '../../providers/playprovider';
import { makesubmission } from '../../providers/service';
import { ThreeDots } from 'react-loader-spinner';
import { IoIosArrowBack } from "react-icons/io";
import { useLocation } from 'react-router-dom';

export default function Playground() {
    const params = useParams();
    const { fileId, folderId } = params;
    const { getFileLanguage } = useContext(Playgroundcontext);
    const [userinput, setUserinput] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('');
    const [showloader, setShowloader] = useState(false);

    const navigate = useNavigate();
    const outputRef = useRef(null);
    const location = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [location])

    useEffect(() => {
        const lang = getFileLanguage(fileId, folderId);
        setLanguage(lang);
    }, [fileId, folderId, getFileLanguage]);

    const uploadinput = (e) => {
        const file = e.target.files[0];
        const fileType = file.type.includes('text');
        if (fileType) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = function (value) {
                const importedCode = value.target.result;
                setUserinput(importedCode);
            };
        } else {
            alert('Please choose a text file');
        }
    };

    const handeloutput = () => {
        const outputValue = output.trim();
        if (!outputValue) {
            alert('Output area is empty');
            return;
        }

        const blob = new Blob([outputValue], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleInputChange = (e) => {
        setUserinput(e.target.value);
    };

    const handleOutputChange = (e) => {
        setOutput(e.target.value);
    };

    const callback = ({ apiStatus, data, message }) => {
        setShowloader(apiStatus === 'loading');
    
        if (apiStatus === 'error') {
            setOutput('Something went wrong');
            console.error('API Error:', message);
        } else if (apiStatus === 'success') {
            if (data.status.id === 3) {
                setOutput(atob(data.stdout));
            } else {
                setOutput(atob(data.stderr));
            }
            outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    const runcode = useCallback(({ code, language }) => {
        makesubmission({ code, language, stdin: userinput, callback });
    }, [userinput]);

    return (
        <div className='playground-container'>
            <div className='header-container'>
                <span onClick={()=>navigate('/')} className='backbtn'><IoIosArrowBack/>back</span>
                <img className='logo' src={logo} alt="Logo" onClick={() => navigate('/')} />
            </div>

            <div className='content-container'>
                <div className='editor-container'>
                    <Editorcontainer fileId={fileId} folderId={folderId} initialLanguage={language} runcode={runcode} />
                </div>

                <div className='input-container'>
                    <div className='input-header'>
                        <b>Input:</b>
                        <label htmlFor="input" className='icon-container'>
                            <span><TfiImport /></span>
                            <b>Import Input</b>
                        </label>
                        <input style={{ display: 'none' }} type="file" id='input' onChange={uploadinput} />
                    </div>
                    <textarea
                        value={userinput}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="output-container">
                    <div className="output-header">
                        <b>Output:</b>
                        <button className='icon-container' onClick={handeloutput}>
                            <span><TfiExport /></span>
                            <b>Export Output</b>
                        </button>
                    </div>
                    <textarea
                        ref={outputRef}
                        readOnly
                        value={output}
                        onChange={handleOutputChange}
                    ></textarea>
                </div>

                {window.innerWidth <= 430 && <div className="empty-div"></div>}
            </div>

            {showloader && <div className="page-loader">
                <div className="loader">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="gray"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>}
        </div>
    );
}
