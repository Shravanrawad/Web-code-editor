import React, { useContext } from 'react';
import './rightcom.scss';
import { IoMdAdd } from "react-icons/io";
import { FaFolder } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import logo from '../../logo/image.png';
import { Playgroundcontext } from '../../providers/playprovider';
import { Modalcontext, modalconstant } from '../../providers/modalprovider';
import { useNavigate } from 'react-router-dom';

const Folder = ({ folder }) => {
    const { deleteFolder, deletefilecard } = useContext(Playgroundcontext);
    const modalfeature = useContext(Modalcontext);
    const navigate = useNavigate();

    const handleDeleteFolder = () => {
        deleteFolder(folder.id);
    };

    const handleEditFolder = () => {
        modalfeature.openmodal(modalconstant.EDIT_FOLDER_TITLE, { folderId: folder.id });
    };

    const editfilename = (fileId) => {
        modalfeature.openmodal(modalconstant.EDIT_FILE_TITLE, { folderId: folder.id, fileId });
    };

    const handleDeleteFile = (fileId) => {
        deletefilecard(folder.id, fileId);
    };

    const openCreateFileModal = () => {
        modalfeature.openmodal(modalconstant.CREATE_FILE, { folderId: folder.id });
    };

    const navigateplayground = (fileId, folderId) => {
        navigate(`/playground/${fileId}/${folderId}`);
    };

    return (
        <div className="folder-container">
            <div className="folder-header">
                <div className='header-item'>
                    <FaFolder style={{ color: '#FFCA29' }} />
                    <span>{folder.title}</span>
                </div>
                <div className='header-item'>
                    <RiDeleteBinLine className='delete-folder' onClick={handleDeleteFolder} />
                    <AiOutlineEdit className='edit-folder' onClick={handleEditFolder} />
                    <button style={{ cursor: 'pointer' }} className='addfile' onClick={openCreateFileModal}>
                        <IoMdAdd />
                        <span>New playground</span>
                    </button>
                </div>
            </div>

            <div className="cards-container">
                {folder.files.map((file) => (
                    <div className="card" key={file.id} onClick={() => navigateplayground(file.id, folder.id)}>
                        <img src={logo} alt="" />
                        <div className='title-container'>
                            <span>{file.title}</span>
                            <span>Language: {file?.language}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <RiDeleteBinLine style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleDeleteFile(file.id); }} />
                            <AiOutlineEdit style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); editfilename(file.id); }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

function Rightcomponents() {
    const { folders } = useContext(Playgroundcontext);
    const modalfeature = useContext(Modalcontext);

    const openCreateFolderModal = () => {
        modalfeature.openmodal(modalconstant.CREATE_FOLDER);
    };

    return (
        <div className='rigth'>
            <div className="header">
                <div className='title'>
                    <span>My </span>Playground
                </div>
                <button className='addfolder' onClick={openCreateFolderModal}>
                    <IoMdAdd />
                    <span>New Folder</span>
                </button>
            </div>
            {folders && folders.map((folder) => (
                <Folder key={folder.id} folder={folder} />
            ))}
        </div>
    );
}

export default Rightcomponents;
