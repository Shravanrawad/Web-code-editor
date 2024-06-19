import React, { useContext } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import './createplayground.scss';
import { Modalcontext } from '../modalprovider';
import { Playgroundcontext } from '../playprovider';

function Createplayground() {
    const modalfeature = useContext(Modalcontext);
    const closemodal = () => {
        modalfeature.closemodal();
    };
    const { createNewPlayground } = useContext(Playgroundcontext); 

    const onSubmitmodal = (e) => {
        e.preventDefault(); 
        const foldername = e.target.foldername.value;
        const filename = e.target.filename.value;
        const language = e.target.language.value;
        createNewPlayground({
            foldername,
            filename,
            language
        });
        closemodal(); 
    };

    return (
        <div className='modal-container'>
            <form className='modal-body' onSubmit={onSubmitmodal}>
                <span onClick={closemodal} className='close'><IoCloseSharp /></span>
                <h1>Create New Playground</h1>

                <div className='item'>
                    <p>Enter Folder Name</p>
                    <input  name='foldername' required />
                </div>

                <div className='item'>
                    <p>Enter Card name</p>
                    <input name='filename' required />
                </div>

                <div className='item'>
                    <select name='language' required>
                        <option value="cpp">C++</option>
                        <option value="javascript">Javascript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                    </select>

                    <button type='submit'>
                        Create playground
                    </button>
                </div>

            </form>
        </div>
    );
}

export default Createplayground;
