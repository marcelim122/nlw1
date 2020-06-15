import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {FiUpload} from 'react-icons/fi';

import './styles.css';

interface Props{
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) => {
    const [selectedFileURL, setSelectedFileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])

    const {getRootProps, getInputProps/*, isDragActive*/} = useDropzone({onDrop, accept: 'image/*'})

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />

            {selectedFileURL
                ? <img src={selectedFileURL} alt="Point thumbnail" />
                : (
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento
                    </p>
                )
            }    
        </div>
    )
}

//função para arrastar o arquivo em cima do dropzone e alterar o que esta escrito enquanto arrasta
/*{
    isDragActive ?
        <p>Drop the files here ...</p> :
        <p>Drag 'n' drop some files here, or click to select files</p>
}*/

export default Dropzone;