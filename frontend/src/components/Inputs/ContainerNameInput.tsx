import { ImageUploaderContext } from '../../providers/ImageUploaderContext';
import './index.css';
import { ChangeEvent, useContext } from 'react';

export default function ContainerNameInput() {
  const { containerName, setContainerName } = useContext(ImageUploaderContext);

  const updateName = (ev: ChangeEvent<HTMLInputElement>) => {
    setContainerName(ev.target.value);
  }
  return (
    <input id="container-name" value={containerName} onChange={updateName} className="container-input" type="text" placeholder="What's the container name"/>
  )
}