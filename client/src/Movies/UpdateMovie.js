import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateMovie(props) {
  const [movie, setMovie] = useState({
    id: '',
    title: '',
    director: '',
    metascore: 0,
    stars: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(result => {
        setMovie(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };
  const handleChangeStars = e => {
    setMovie({
      ...movie,
      stars: [e.target.value]
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        props.history.push('/movies');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          placeholder='Title...'
          onChange={handleChange}
          value={movie.title}
        />
        <input
          type='text'
          name='director'
          placeholder='Director...'
          onChange={handleChange}
          value={movie.director}
        />
        <input
          type='number'
          name='metascore'
          placeholder='Metascore...'
          onChange={handleChange}
          value={movie.metascore}
        />

        <input
          type='text'
          name='stars'
          placeholder='Stars...'
          onChange={handleChangeStars}
          value={movie.stars}
        />

        <button type='submit'>Update Movie</button>
      </form>
    </div>
  );
}

export default UpdateMovie;
