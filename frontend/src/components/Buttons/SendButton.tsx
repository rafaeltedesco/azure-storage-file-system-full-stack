import { FileButtonPropos } from '../../types/Buttons';
import axios from 'axios';

export default function SendButton({ files }: FileButtonPropos) {
  async function submit() {
    const formData = new FormData();
    files.forEach(([file]) => {
      formData.append('images', file);
    });

    try {
      const result = await axios.post('http://localhost:7071/api/uploadImageHttp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log(result);
    } catch (err) {
      console.error(err);
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