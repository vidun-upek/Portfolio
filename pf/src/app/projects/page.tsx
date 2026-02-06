import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Projects</h1>

      <ul>
        <li>
          <Link href="/projects/meditrace">MediTrace</Link>
        </li>
        <li>
          <Link href="/projects/crackcode">CrackCode</Link>
        </li>
      </ul>
    </main>
  );
}


