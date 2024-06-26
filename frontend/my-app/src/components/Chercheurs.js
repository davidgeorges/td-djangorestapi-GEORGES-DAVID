// src/components/Chercheurs.js
import React, { useState, useEffect } from 'react';
import { getChercheurs, createChercheur, updateChercheur, deleteChercheur } from '../service/api';

const Chercheurs = () => {
  const [chercheurs, setChercheurs] = useState([]);
  const [newChercheur, setNewChercheur] = useState({ name: '', specialty: '' });
  const [editingChercheur, setEditingChercheur] = useState(null);

  useEffect(() => {
    fetchChercheurs();
  }, []);

  const fetchChercheurs = async () => {
    const response = await getChercheurs();
    setChercheurs(response.data);
  };

  const handleCreate = async () => {
    await createChercheur(newChercheur);
    fetchChercheurs();
    setNewChercheur({ name: '', specialty: '' });
  };

  const handleUpdate = async (id) => {
    await updateChercheur(id, editingChercheur);
    fetchChercheurs();
    setEditingChercheur(null);
  };

  const handleDelete = async (id) => {
    await deleteChercheur(id);
    fetchChercheurs();
  };

  return (
    <div className="container">
      <h2>Chercheurs</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={newChercheur.name}
          onChange={(e) => setNewChercheur({ ...newChercheur, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Specialty"
          value={newChercheur.specialty}
          onChange={(e) => setNewChercheur({ ...newChercheur, specialty: e.target.value })}
        />
        <button onClick={handleCreate}>Add Chercheur</button>
      </div>
      <ul>
        {chercheurs.map((chercheur) => (
          <li key={chercheur.id}>
            {editingChercheur && editingChercheur.id === chercheur.id ? (
              <div>
                <input
                  type="text"
                  value={editingChercheur.name}
                  onChange={(e) =>
                    setEditingChercheur({ ...editingChercheur, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingChercheur.specialty}
                  onChange={(e) =>
                    setEditingChercheur({ ...editingChercheur, specialty: e.target.value })
                  }
                />
                <button onClick={() => handleUpdate(chercheur.id)}>Update</button>
                <button onClick={() => setEditingChercheur(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {chercheur.name} - {chercheur.specialty}
                <button onClick={() => setEditingChercheur(chercheur)}>Edit</button>
                <button onClick={() => handleDelete(chercheur.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chercheurs;
