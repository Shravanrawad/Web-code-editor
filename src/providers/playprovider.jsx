import React, { createContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';

export const Playgroundcontext = createContext();

const initialData = [
    {
        id: v4(),
        title: 'STACK',
        files: [
            {
                id: v4(),
                title: 'Practice',
                code: 'console.log(hello word)',
                language: 'javascript'
            },
        ]
    }
];

export const defaultCodes = {
    'cpp': `#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
`,
    'java': `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
    'python': `print("Hello, World!")
`,
    'javascript': `console.log("Hello, World!");
`
};

export default function Playprovider({ children }) {
    const [folders, setFolders] = useState(() => {
        const savedData = localStorage.getItem('data');
        return savedData ? JSON.parse(savedData) : initialData;
    });

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(folders));
    }, [folders]);

    const createNewPlayground = ({ foldername, filename, language }) => {
        const newFolder = {
            id: v4(),
            title: foldername,
            files: [
                {
                    id: v4(),
                    title: filename,
                    code: defaultCodes[language] || '',
                    language: language
                }
            ]
        };
        const updatedFolders = [...folders, newFolder];
        setFolders(updatedFolders);
        localStorage.setItem('data', JSON.stringify(updatedFolders));
    };

    const createnewfolder = (foldername) => {
        const newFolder = {
            id: v4(),
            title: foldername,
            files: []
        };
        const updatedFolders = [...folders, newFolder];
        setFolders(updatedFolders);
        localStorage.setItem('data', JSON.stringify(updatedFolders));
    };

    const deleteFolder = (id) => {
        const updatedFolders = folders.filter(folder => folder.id !== id);
        setFolders(updatedFolders);
        localStorage.setItem('data', JSON.stringify(updatedFolders));
    };

    const deletefilecard = (folderId, fileId) => {
        const updatedFolders = folders.map(folder => {
            if (folder.id === folderId) {
                const updatedFiles = folder.files.filter(file => file.id !== fileId);
                return { ...folder, files: updatedFiles };
            }
            return folder;
        });
        setFolders(updatedFolders);
        localStorage.setItem('data', JSON.stringify(updatedFolders));
    };

    const editfiletitle = (newfilename, folderId, fileId) => {
        const copiedfolders = folders.map(folder => {
            if (folder.id === folderId) {
                return {
                    ...folder,
                    files: folder.files.map(file =>
                        file.id === fileId ? { ...file, title: newfilename } : file
                    )
                };
            }
            return folder;
        });

        setFolders(copiedfolders);
        localStorage.setItem('data', JSON.stringify(copiedfolders));
    };

    const createnewfile = (folderId, filename, language) => {
        const newFile = {
            id: v4(),
            title: filename,
            code: defaultCodes[language] || '',
            language: language
        };

        const updatedFolders = folders.map(folder => {
            if (folder.id === folderId) {
                return {
                    ...folder,
                    files: [...folder.files, newFile]
                };
            }
            return folder;
        });

        setFolders(updatedFolders);
        localStorage.setItem('data', JSON.stringify(updatedFolders));
    };

    const editFolderTitle = (id, newTitle) => {
        const updatedFolders = folders.map(folder =>
            folder.id === id ? { ...folder, title: newTitle } : folder
        );
        setFolders(updatedFolders);
        localStorage.setItem('data', JSON.stringify(updatedFolders));
    };

    const getDefaultcode = (fileId, folderId) => {
        for (const folder of folders) {
            if (folder.id === folderId) {
                for (const file of folder.files) {
                    if (file.id === fileId) {
                        return file.code;
                    }
                }
            }
        }
        return '';
    };

    const getFileLanguage = (fileId, folderId) => {
        const folder = folders.find(f => f.id === folderId);
        const file = folder?.files.find(f => f.id === fileId);
        return file?.language || 'javascript'; 
    };

    const saveCode = (fileId, folderId, newCode) => {
        const updatedFolders = folders.map(folder => {
            if (folder.id === folderId) {
                return {
                    ...folder,
                    files: folder.files.map(file =>
                        file.id === fileId ? { ...file, code: newCode } : file
                    )
                };
            }
            return folder;
        });

        setFolders(updatedFolders);
        localStorage.setItem('data', JSON.stringify(updatedFolders));
    };

    const getFileTitle = (fileId, folderId) => {
        const folder = folders.find(f => f.id === folderId);
        const file = folder?.files.find(f => f.id === fileId);
        return file?.title || 'Untitled';
    };

    return (
        <Playgroundcontext.Provider value={{ folders, getFileTitle, createNewPlayground, createnewfolder, deleteFolder, editFolderTitle, editfiletitle, createnewfile, deletefilecard, getDefaultcode, getFileLanguage, saveCode }}>
            {children}
        </Playgroundcontext.Provider>
    );
}
