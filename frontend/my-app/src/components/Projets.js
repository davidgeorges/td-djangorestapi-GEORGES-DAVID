// src/components/Projets.js
import React, { useState, useEffect } from 'react';
import { getProjets, createProjet, updateProjet, deleteProjet } from '../service/api';

const Projets = () => {
  const [projets, setProjets] = useState([]);
  const [newProjet, setNewProjet] = useState({
    title: '',
    description: '',
    start_date: '',
    expected_end_date: '',
    project_leader: '',
  });
  const [editingProjet, setEditingProjet] = useState(null);

  useEffect(() => {
    fetchProjets();
  }, []);

  const fetchProjets = async () => {
    const response = await getProjets();
    setProjets(response.data);
  };

  const handleCreate = async () => {
    await createProjet(newProjet);
    fetchProjets();
    setNewProjet({
      title: '',
      description: '',
      start_date: '',
      expected_end_date: '',
      project_leader: '',
    });
  };

  const handleUpdate = async (id) => {
    await updateProjet(id, editingProjet);
    fetchProjets();
    setEditingProjet(null);
  };

  const handleDelete = async (id) => {
    await deleteProjet(id);
    fetchProjets();
  };

  return (
    <div className="container">
      <h2>Projets</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={newProjet.title}
          onChange={(e) => setNewProjet({ ...newProjet, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newProjet.description}
          onChange={(e) => setNewProjet({ ...newProjet, description: e.target.value })}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={newProjet.start_date}
          onChange={(e) => setNewProjet({ ...newProjet, start_date: e.target.value })}
        />
        <input
          type="date"
          placeholder="Expected End Date"
          value={newProjet.expected_end_date}
          onChange={(e) => setNewProjet({ ...newProjet, expected_end_date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Project Leader"
          value={newProjet.project_leader}
          onChange={(e) => setNewProjet({ ...newProjet, project_leader: e.target.value })}
        />
        <button onClick={handleCreate}>Add Projet</button>
      </div>
      <ul>
        {projets.map((projet) => (
          <li key={projet.id}>
            {editingProjet && editingProjet.id === projet.id ? (
              <div>
                <input
                  type="text"
                  value={editingProjet.title}
                  onChange={(e) =>
                    setEditingProjet({ ...editingProjet, title: e.target.value })
                  }
                />
                <textarea
                  value={editingProjet.description}
                  onChange={(e) =>
                    setEditingProjet({ ...editingProjet, description: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={editingProjet.start_date}
                  onChange={(e) =>
                    setEditingProjet({ ...editingProjet, start_date: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={editingProjet.expected_end_date}
                  onChange={(e) =>
                    setEditingProjet({
                      ...editingProjet,
                      expected_end_date: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editingProjet.project_leader}
                  onChange={(e) =>
                    setEditingProjet({
                      ...editingProjet,
                      project_leader: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleUpdate(projet.id)}>Update</button>
                <button onClick={() => setEditingProjet(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                {projet.title} - {projet.description}
                <button onClick={() => setEditingProjet(projet)}>Edit</button>
                <button onClick={() => handleDelete(projet.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projets;