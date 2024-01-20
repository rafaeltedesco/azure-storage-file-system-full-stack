import './index.css';

export default function Header() {
  return (
    <header>
      <h1>Azure Storage File System</h1>
      <ul className="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/list-containers">List Containers</a></li>
      </ul>
    </header>
  )
}