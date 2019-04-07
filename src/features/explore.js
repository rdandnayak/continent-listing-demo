import React, { Component } from 'react';
import {
  Card,
  ListGroup,
  ListGroupItem,
  Pagination,
  Col,
  Row
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import localforage from 'localforage';
import Loader from 'react-loader-spinner';

const data = {
  Search: [
    {
      Title: "One Flew Over the Cuckoo's Nest",
      Year: '1975',
      imdbID: 'tt0073486',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    },
    {
      Title: 'Rogue One: A Star Wars Story',
      Year: '2016',
      imdbID: 'tt3748528',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg'
    },
    {
      Title: 'Ready Player One',
      Year: '2018',
      imdbID: 'tt1677720',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_SX300.jpg'
    },
    {
      Title: 'Let the Right One In',
      Year: '2008',
      imdbID: 'tt1139797',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BM2Q1YWU3ZjgtMTE0Ny00MGRkLTljMDgtOWYwZDU2YmE2YmVmXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg'
    },
    {
      Title: 'Air Force One',
      Year: '1997',
      imdbID: 'tt0118571',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYTk5NWE2ZjAtZmRmOS00ZGYzLWI5ZmUtMDcwODI0YWY0MTRlL2ltYWdlXkEyXkFqcGdeQXVyNjQzNDI3NzY@._V1_SX300.jpg'
    },
    {
      Title: 'One Day',
      Year: '2011',
      imdbID: 'tt1563738',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTQ3NTg2MDI3NF5BMl5BanBnXkFtZTcwMjc5MTA1NA@@._V1_SX300.jpg'
    },
    {
      Title: 'One Hour Photo',
      Year: '2002',
      imdbID: 'tt0265459',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BYWVkMjAzY2QtZTA4Yi00OWZmLTliMzctZTkyODU4NTc3MmRjL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    },
    {
      Title: 'The Lucky One',
      Year: '2012',
      imdbID: 'tt1327194',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTg5NDk3MjAzMF5BMl5BanBnXkFtZTcwMjUyNzExNw@@._V1_SX300.jpg'
    },
    {
      Title: 'Year One',
      Year: '2009',
      imdbID: 'tt1045778',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTcyMjI2OTgxN15BMl5BanBnXkFtZTcwODU3ODkzMg@@._V1_SX300.jpg'
    },
    {
      Title: 'The One',
      Year: '2001',
      imdbID: 'tt0267804',
      Type: 'movie',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNzY4YmUzMDAtMDYyZS00MTBmLWEzZDAtOGY3MDE2YjJkMGUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
    }
  ],
  totalResults: '6710',
  Response: 'True'
};

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      loader: false
    };
    this.currentUrl = 'http://www.omdbapi.com/?s=one&page=1&apikey=87644019';
  }

  fetchMovieResults = page => {
    let self = this;
    this.setState({ loader: true }, () => {
      fetch(`http://www.omdbapi.com/?s=one&page=${page}&apikey=87644019`)
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              'Looks like there was a problem. Status Code: ' + response.status
            );
            return;
          }

          // Examine the text in the response
          response.json().then(function(list) {
            self.setState({ movies: list, page, loader: false });
          });
        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    });
  };
  componentDidMount() {
    let self = this;

    this.fetchMovieResults(1);
  }
  onPaginate = number => {
    console.info(number);
    this.fetchMovieResults(number);
  };
  render() {
    const { movies, loader } = this.state;
    const { history } = this.props;

    let active = 1;
    let items = [];
    for (let number = 1; number <= 10; number++) {
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => this.onPaginate(number)}
          active={number === this.state.page}
        >
          {number}
        </Pagination.Item>
      );
    }

    const paginationBasic = (
      <div>
        <br />
        <Pagination size="sm">{items}</Pagination>
      </div>
    );

    return (
      <Row className={'exploreView'}>
        <Col md={12}>{paginationBasic}</Col>
        {loader ? (
          <Loader type="Puff" color="#000" height="100" width="100" />
        ) : (
          movies &&
          movies.Search &&
          movies.Search.map((movie, index) => {
            return (
              <Card
                key={index}
                style={{ width: '18rem', margin: '20px', cursor: 'pointer' }}
                onClick={() => {
                  const id = movie.imdbID;
                  history.push(`/details/${id}`);
                }}
              >
                <Card.Img variant="top" src={movie.Poster} />
                <Card.Body>
                  <Card.Title>
                    {movie.Title} ({movie.Year})
                  </Card.Title>
                </Card.Body>
                {/* <Card.Body>
                  <Card.Link href="#">more</Card.Link>
                </Card.Body> */}
              </Card>
            );
          })
        )}
      </Row>
    );
  }
}

export default withRouter(Explore);
