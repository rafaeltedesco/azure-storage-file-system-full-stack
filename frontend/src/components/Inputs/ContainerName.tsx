import { ChangeEvent } from 'react';
import { ContainerNameProps } from '../../types/Inputs';

export default function ContainerName({ handleContainerName }: ContainerNameProps) {
  const { containerName, setContainerName } = handleContainerName;

  const updateName = (ev: ChangeEvent<HTMLInputElement>) => {
    setContainerName(ev.target.value);
  }
  return (
    <input value={containerName} onChange={updateName} className="container-input" type="text" placeholder="What's the container name container name"/>
  )
}