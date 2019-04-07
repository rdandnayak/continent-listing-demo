import React from 'react';
import { Card, Alert, Col, Row, Media, Form, Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

const data = {
  Title: 'The Social Network',
  Year: '2010',
  Rated: 'PG-13',
  Released: '01 Oct 2010',
  Runtime: '120 min',
  Genre: 'Biography, Drama',
  Director: 'David Fincher',
  Writer: 'Aaron Sorkin (screenplay), Ben Mezrich (book)',
  Actors: 'Jesse Eisenberg, Rooney Mara, Bryan Barter, Dustin Fitzsimons',
  Plot:
    'Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.',
  Language: 'English, French',
  Country: 'USA',
  Awards: 'Won 3 Oscars. Another 165 wins & 168 nominations.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '7.7/10' },
    { Source: 'Rotten Tomatoes', Value: '95%' },
    { Source: 'Metacritic', Value: '95/100' }
  ],
  Metascore: '95',
  imdbRating: '7.7',
  imdbVotes: '562,197',
  imdbID: 'tt1285016',
  Type: 'movie',
  DVD: '11 Jan 2011',
  BoxOffice: '$96,400,000',
  Production: 'Columbia Pictures',
  Website: 'http://www.thesocialnetwork-movie.com/',
  Response: 'True'
};
class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      review: false,
      rating: 3,
      alert: ''
    };
  }
  componentDidMount() {
    const { match } = this.props;
    let self = this;
    console.warn(match);
    // self.setState({ details: data });
    fetch(`http://www.omdbapi.com/?i=${match.params.id}&apikey=87644019`)
      .then(function(response) {
        if (response.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function(details) {
          self.setState({ details });
        });
      })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  }
  handleChange = event => {
    this.setState({ rating: event.target.value });
  };
  render() {
    const { details, review, rating } = this.state;
    const { match } = this.props;
    let self = this;

    return (
      <Row>
        <Col>
          <br />
          {Object.keys(details).length == 0 ? (
            <Loader type="Puff" color="#000" height="100" width="100" />
          ) : (
            <Media>
              <img
                className="mr-3"
                src={details.Poster}
                alt="Generic placeholder"
              />
              <Media.Body>
                <h5>
                  {details.Title} (Year - {details.Year})
                </h5>
                <p>{details.Plot}</p>
                <strong>Actors:</strong> {details.Actors}
                <br />
                <strong>Language:</strong> {details.Language}
                <br />
                <strong>Release Date:</strong> {details.Released}
                <br />
                <strong>Run Time:</strong> {details.Runtime}
                <br />
                <strong>Genre:</strong> {details.Genre}
                <br />
                <strong>Director:</strong> {details.Director}
                <br />
                <strong>Writer:</strong> {details.Writer} <br /> <br />
                <a
                  onClick={() => {
                    self.setState({ review: true });
                  }}
                  href="#disabled"
                >
                  Write a Review
                  <br />
                </a>
                {review ? (
                  <section className="review">
                    <br />
                    <Form
                      onSubmit={e => {
                        e.preventDefault();
                        let user = JSON.parse(
                          localStorage.getItem('currentUser')
                        );
                        let userReviews = !!localStorage.getItem('userReviews')
                          ? JSON.parse(localStorage.getItem('userReviews'))
                          : {};
                        if (Object.keys(userReviews).length === 0)
                          userReviews[user.email] = [];
                        if (Object.keys(userReviews).indexOf(user.email) > -1) {
                          userReviews[user.email].push({ ...details, rating });
                        }
                        localStorage.setItem(
                          'userReviews',
                          JSON.stringify(userReviews)
                        );
                        this.setState({
                          alert: 'Review Submitted Successfully'
                        });
                        return false;
                      }}
                    >
                      {/* <Form.Group controlId="formBasicEmail"> */}
                      <div className="slidecontainer">
                        <input
                          id="typeinp"
                          type="range"
                          min="0"
                          max="5"
                          value={this.state.value}
                          onChange={this.handleChange}
                          step="1"
                        />
                        {' ' + this.state.rating}
                      </div>
                      {/* </Form.Group> */}
                      <br />
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                      {!!this.state.alert ? (
                        <Alert style={{ marginTop: 20 }} variant={'success'}>
                          {this.state.alert}
                        </Alert>
                      ) : (
                        ''
                      )}
                    </Form>
                  </section>
                ) : (
                  ''
                )}
              </Media.Body>
            </Media>
          )}
        </Col>
      </Row>
    );
  }
}

export default MovieDetails;
