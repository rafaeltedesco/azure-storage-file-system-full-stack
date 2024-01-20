import './index.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './index.css';
import { ListContainerSVCResponse, ListContainersService } from '../../services/ListContainersService';
import Header from '../../components/Header';

export default function ListContainers() {

  const [containers, setContainers] = useState<ListContainerSVCResponse>([] as ListContainerSVCResponse);
  
  const api = useMemo(() => new ListContainersService(), []);

  const fetchContainers = useCallback(async () => {
    try {
      const result = await api.listContainers();
      setContainers(result);
    } catch (err) {
      console.error('Error loading containers', err);
    }
  }, [api])

  useEffect(() => {
    fetchContainers();
  }, [fetchContainers])

  const renderContainers = () => {
    return containers.map((container, idx) => (
      <li key={idx}>
        { container.containerName }
      </li>
    ))
  }

  return (
    <main className="outer-container">
    <Header />
      <section className="containers-list">
          <ul>
            { renderContainers() }
          </ul>
      </section>
    </main>
  )
}