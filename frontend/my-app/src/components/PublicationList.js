import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { getPublications, deletePublication } from '../service/api';
import { useNavigate } from 'react-router-dom';

const PublicationList = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPublications().then((response) => {
      setPublications(response.data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/publications/${id}/modifier`);
  };

  const handleDelete = (id) => {
    deletePublication(id).then(() => {
      setPublications(publications.filter((publication) => publication.id !== id));
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {publications.map((publication) => (
        <ListItem key={publication.id}>
          <ListItemText primary={publication.title} secondary={publication.abstract} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(publication.id)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(publication.id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PublicationList;
