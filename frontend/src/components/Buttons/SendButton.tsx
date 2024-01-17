import { FileButtonPropos } from '../../types/Buttons';

export default function SendButton({ files }: FileButtonPropos) {

  function submit() {
    console.log("sending files", files[0]);
  }

  return (
    <>
      <div className="right">
        <button className="button-1" onClick={submit}>Load</button>
      </div>
    </>
  )
}