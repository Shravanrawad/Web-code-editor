import React, { useContext } from 'react';
import './createplayground.scss';
import { IoCloseSharp } from "react-icons/io5";
import { Modalcontext } from '../modalprovider';
import { Playgroundcontext } from '../playprovider';

export default function EditFolder({ folderId }) {
    const { closemodal } = useContext(Modalcontext);
    const { editFolderTitle } = useContext(Playgroundcontext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTitle = e.target.foldername.value;
        editFolderTitle(folderId, newTitle);
        closemodal();
    };

    return (
        <div className='modal-container'>
            <form className='modal-body' onSubmit={handleSubmit}>
                <span onClick={closemodal} className='close'><IoCloseSharp /></span>
                <h1>Edit Folder Title</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input name='foldername' style={{ flexGrow: 1, padding: '10px' }} type="text" placeholder='Enter New Folder Name' required/>
                    <button  style={{border: 'none', padding: '10px 10px', borderRadius: '5px', backgroundColor: 'dodgerblue', color: 'white', cursor: 'pointer',}} type='submit'>Save changes</button>
                </div>
            </form>
        </div>
    );
}
