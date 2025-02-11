import { useState, useEffect } from 'react';

export default function Shop() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setPlants(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl">Shop Plants</h1>
      <div className="grid grid-cols-3 gap-4">
        {plants.map((plant) => (
          <div key={plant.id} className="border p-4">
            <h2 className="text-xl">{plant.name}</h2>
            <p>${plant.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
