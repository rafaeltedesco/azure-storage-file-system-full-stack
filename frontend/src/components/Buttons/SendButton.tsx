import { FileUploaderService } from '../../services/FileUploaderService';
import { FileButtonPropos } from '../../types/Buttons';

const apiService = new FileUploaderService();

export default function SendButton({ files, resetFiles, containerName }: FileButtonPropos) {
  
  async function sendImages(formData: FormData) {
    await apiService.sendImages({ formData, containerName });
  }
  
  async function submit() {
    const formData = new FormData();
    files.forEach(([file]) => {
      formData.append(file.name, file);
    });

    try {
      await sendImages(formData);
    } catch (err) {
      console.error(err);
      }
    finally {
      resetFiles();
    }
  }

  return (
    <>
      <div className="right">
        <button className="button-1" onClick={submit}>Load</button>
      </div>
    </>
  )
}