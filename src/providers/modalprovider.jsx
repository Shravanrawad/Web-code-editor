import React, { createContext, useState, useContext } from 'react';

export const Modalcontext = createContext();

export const modalconstant = {
    CREATE_PLAYGROUND: 'CREATE_PLAYGROUND',
    CREATE_FOLDER: 'CREATE_FOLDER',
    EDIT_FOLDER_TITLE: 'EDIT_FOLDER_TITLE',
    EDIT_FILE_TITLE: 'EDIT_FILE_TITLE',
    CREATE_FILE: 'CREATE_FILE'
};

export default function Modalprovider({ children }) {
    const [modaltype, setmodaltype] = useState(null);
    const [modalProps, setModalProps] = useState({});

    const closemodal = () => {
        setmodaltype(null);
        setModalProps({});
    };

    const openmodal = (type, props = {}) => {
        setmodaltype(type);
        setModalProps(props);
    };

    const modalfeature = {
        openmodal,
        closemodal,
        activemodal: modaltype,
        modalProps,
        isModalOpen: () => modaltype !== null
    };

    return (
        <Modalcontext.Provider value={modalfeature}>
            {children}
        </Modalcontext.Provider>
    );
}
