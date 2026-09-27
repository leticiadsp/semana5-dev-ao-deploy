"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  items: string[];
};

export default function Home() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  useEffect(() => {
    fetch(`${apiUrl}/health/`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        setError("Nao foi possivel carregar os dados do backend.");
        console.log(err);
      });
  }, []);

  if (error) {
    return <main style={{ padding: 40 }}>{error}</main>;
  }

  if (!data) {
    return <main style={{ padding: 40 }}>Carregando...</main>;
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Status: {data.status}</h1>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
