import React, { useContext } from 'react';
import { Modalcontext, modalconstant } from '../modalprovider';
import Createplayground from './createplayground';
import Createfoldermodal from './createfoldermodal';
import Editfolder from './editfolder';
import Editfiletitle from './editfiletitle';
import Createfile from './createfile';

export default function Modal() {
    const modalfeatures = useContext(Modalcontext);

    return (
        <>
            {modalfeatures.activemodal === modalconstant.CREATE_PLAYGROUND && <Createplayground />}
            {modalfeatures.activemodal === modalconstant.CREATE_FOLDER && <Createfoldermodal />}
            {modalfeatures.activemodal === modalconstant.EDIT_FOLDER_TITLE && 
                <Editfolder folderId={modalfeatures.modalProps.folderId} />}
            {modalfeatures.activemodal === modalconstant.EDIT_FILE_TITLE && 
                <Editfiletitle folderId={modalfeatures.modalProps.folderId} fileId={modalfeatures.modalProps.fileId} />}
            {modalfeatures.activemodal === modalconstant.CREATE_FILE && 
                <Createfile folderId={modalfeatures.modalProps.folderId} />}
        </>
    );
}
