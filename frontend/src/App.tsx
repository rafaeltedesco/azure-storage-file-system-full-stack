import './App.css'
import { useDropzone } from 'react-dropzone'
import SendButton from './components/Buttons/SendButton';
import { useCallback, useMemo, useState } from 'react';

function App() {

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles;
    const formData = new FormData();
    const newTempFileList: File[] = [];
    newFiles.forEach((file) => {
      
      const hasSameFile = files.some(tempFile => tempFile.name === file.name);
        if (hasSameFile) {
          alert('You\'ve already sent this file');
          return;
        }
      formData.append('images', file);
    
      newTempFileList.push(file);
    
    })
    setFiles((oldFiles) => {
      return [...oldFiles, ...newTempFileList];
    })
      
  }, [files])
    // setFiles((currentFiles) => {
    //   const tempFiles = currentFiles.values();

    //   for (let i = 0; i < currentFiles.length; i++) {
    //     acceptedFiles.includes(currentFiles[i])
    //   }
    // });


  const { getRootProps, getInputProps  } = useDropzone({ onDrop });

  const removeFileFromTemp = (idx: number) => {
    console.log(idx)
    setFiles((currentFiles) => {
      return [...currentFiles.slice(0, idx), ...currentFiles.slice(idx+1)]
    } )
  }

  const renderFiles = useMemo(() => files.map((file, idx) => {
    const imageUrl = URL.createObjectURL(file);
    return (
    <li key={file.name}>
      <a className="url-preview" href={imageUrl} target='_blank'>{ file.name } - { file.size } bytes</a>
      <button onClick={() => removeFileFromTemp(idx)}>X</button>
    </li>
    )}), [files])

  return (
    <main className="outer-container">
      <header>
        <h1>Azure Storage File System</h1>
      </header>
      <section className="container">
         <aside className="side-bar">
          <div className="side-bar-header">
            <h4 className="title">{files.length? "Files" : "No Files Were Uploaded"}</h4>
            <hr />
          </div>
          { !!files.length && (
            <div className="side-bar-body">
              <ul className="files-list">{renderFiles}</ul>
              <SendButton files={files} />
            </div>
          )}
        </aside>
        <div className="image-container">
          <div {...getRootProps({className: 'dropzone'})} className="dropzone">
            <input {...getInputProps()} />
            <p className="drag-message">Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
    </section>
  </main>
  )
}

export default App
