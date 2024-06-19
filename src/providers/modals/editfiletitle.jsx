import React, { useContext } from 'react';
import './createplayground.scss';
import { IoCloseSharp } from "react-icons/io5";
import { Modalcontext } from '../modalprovider';
import { Playgroundcontext } from '../playprovider';

function Editfiletitle({ folderId, fileId }) {
    const { closemodal } = useContext(Modalcontext);
    const { editfiletitle } = useContext(Playgroundcontext);

    const onsubmit = (e) => {
        e.preventDefault();
        const newFilename = e.target.filename.value;
        editfiletitle(newFilename, folderId, fileId);
        closemodal();
    };

    return (
        <div className='modal-container'>
            <form className='modal-body' onSubmit={onsubmit}>
                <span onClick={closemodal} className='close'><IoCloseSharp /></span>
                <h1>Edit File Name</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input name='filename' style={{ flexGrow: 1, padding: '10px' }} type="text" placeholder='Enter New File Name' required />
                    <button  style={{border: 'none', padding: '10px 10px', borderRadius: '5px', backgroundColor: 'dodgerblue', color: 'white', cursor: 'pointer',}} type='submit'>Save changes</button>
                </div>
            </form>
        </div>
    );
}

export default Editfiletitle;
