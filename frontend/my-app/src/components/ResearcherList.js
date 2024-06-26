import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getChercheurs, deleteChercheur } from '../service/api';
import { useNavigate } from 'react-router-dom';

const ResearcherList = () => {
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getChercheurs().then((response) => {
      setResearchers(response.data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/chercheurs/${id}/modifier`);
  };

  const handleDelete = (id) => {
    deleteChercheur(id).then(() => {
      setResearchers(researchers.filter((researcher) => researcher.id !== id));
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {researchers.map((researcher) => (
        <ListItem key={researcher.id}>
          <ListItemText primary={researcher.name} secondary={researcher.specialty} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(researcher.id)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(researcher.id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ResearcherList;
