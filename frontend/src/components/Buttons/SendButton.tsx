import { FileButtonPropos } from '../../types/Buttons';
import axios from 'axios';

export default function SendButton({ files, resetFiles }: FileButtonPropos) {
  async function submit() {
    const formData = new FormData();
    files.forEach(([file]) => {
      formData.append(file.name, file);
    });

    try {
      const result = await axios.post('http://localhost:7071/blobs/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(result);
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