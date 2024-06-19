import React, { useContext } from 'react';
import './createplayground.scss';
import { IoCloseSharp } from "react-icons/io5";
import { Modalcontext } from '../modalprovider';
import { Playgroundcontext } from '../playprovider';

export default function Createfile({ folderId }) {
    const { closemodal } = useContext(Modalcontext);  
    const { createnewfile } = useContext(Playgroundcontext);
  
    const onsubmit = (e) => {
        e.preventDefault();
        const filename = e.target.filename.value;
        const language = e.target.language.value;
        createnewfile(folderId, filename, language);
        closemodal();
    };

    return (
        <div className='modal-container'>
            <form className='modal-body' onSubmit={onsubmit}>
                <span onClick={closemodal} className='close'><IoCloseSharp /></span>
                <h1>Create New Playground</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input style={{ flexGrow: 1, padding: '10px' }} placeholder='Enter Playground Name' name='filename' required />
                    <select style={{ flexGrow: 1, padding: '10px' }} name="language" required>
                        <option value="cpp">cpp</option>
                        <option value="python">python</option>
                        <option value="java">java</option>
                        <option value="javascript">javascript</option>
                    </select>
                </div>
                <button style={{border: 'none', padding: '10px 10px', borderRadius: '5px', backgroundColor: 'dodgerblue', color: 'white', cursor: 'pointer',}} type='submit'>Create Playground</button>
            </form>
        </div>
    );
}
