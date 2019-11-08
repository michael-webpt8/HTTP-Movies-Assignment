import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieCard = props => {
  const { id, title, director, metascore, stars } = props.movie;

  const handleDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm('sure you want to delete?')) {
      axios
        .delete(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
          props.history.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <div className='movie-card'>
      <Link to={`/update-movie/${id}`}>update</Link>
      <button onClick={e => handleDelete(e, id)}>Delete Movie</button>
      <h2>{title}</h2>
      <div className='movie-director'>
        Director: <em>{director}</em>
      </div>
      <div className='movie-metascore'>
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className='movie-star'>
          {star}
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
