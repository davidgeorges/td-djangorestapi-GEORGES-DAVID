import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getProjets, deleteProjet } from '../service/api';
import { useNavigate } from 'react-router-dom';

const ResearchProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProjets().then((response) => {
      setProjects(response.data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/projets/${id}/modifier`);
  };

  const handleDelete = (id) => {
    deleteProjet(id).then(() => {
      setProjects(projects.filter((project) => project.id !== id));
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project.id}>
          <ListItemText primary={project.title} secondary={project.description} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(project.id)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(project.id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ResearchProjectList;
