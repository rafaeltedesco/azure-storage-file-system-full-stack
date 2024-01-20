import './index.css';
import { FileUploaderService } from '../../services/FileUploaderService';
import { FileButtonPropos } from '../../types/Buttons';
import { useContext } from 'react';
import { ImageUploaderContext } from '../../providers/ImageUploaderContext';

export default function SendButton({ files, resetFiles }: FileButtonPropos) {
  let operationSucceeded = false;
  const { containerName } = useContext(ImageUploaderContext)
  const minLength = 3;
  const isDisabled = () => containerName.length < minLength;

  async function sendImages(formData: FormData) {
    const apiService = new FileUploaderService();
    await apiService.sendImages({ formData, containerName });
    return true;
  }
  
  async function submit() {
    const formData = new FormData();
    files.forEach(([file]) => {
      formData.append(file.name, file);
    });

    try {
      operationSucceeded = await sendImages(formData);
    } catch (err) {
      console.error(err);
      }
    finally {
      if (operationSucceeded) {
        resetFiles();
      }
    }
  }

  return (
    <>
      <div className="right">
        <button disabled={isDisabled()} className={`button-1 ${isDisabled() ? "disabled" : "active"}`} onClick={submit}>Load</button>
      </div>
    </>
  )
}