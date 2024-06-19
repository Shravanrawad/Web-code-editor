import React, { useContext } from 'react';
import './createplayground.scss';
import { IoCloseSharp } from "react-icons/io5";
import { Modalcontext } from '../modalprovider';
import { Playgroundcontext } from '../playprovider'; 

function Createfoldermodal() {

    const modalfeature = useContext(Modalcontext);
    const { createnewfolder } = useContext(Playgroundcontext); 

    const closemodal = () => {
        modalfeature.closemodal();
    };

    const onsubmitmodal = (e) => {
        e.preventDefault();
        const foldername = e.target.foldername.value;
        createnewfolder(foldername); 
        closemodal();
    };

    return (
        <div className='modal-container'>
            <form className='modal-body' onSubmit={onsubmitmodal}>
                <span className='close' onClick={closemodal}><IoCloseSharp /></span>
                <h1>Create New Folder</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input name='foldername' style={{ flexGrow: 1, padding: '10px' }} type="text" placeholder='Enter Folder Name' />
                    <button style={{border: 'none', padding: '10px 10px', borderRadius: '5px', backgroundColor: 'dodgerblue', color: 'white', cursor: 'pointer',}} type='submit'>Create Folder</button>
                </div>
            </form>
        </div>
    );
}

export default Createfoldermodal;
