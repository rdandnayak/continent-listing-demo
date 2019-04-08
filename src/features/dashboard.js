import React, { Component } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
const { createApolloFetch } = require('apollo-fetch');

const fetchAPI = createApolloFetch({
  uri: 'https://countries.trevorblades.com/graphql'
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      continents: [],
      details: {},
      loader: false
    };
    this.fetchContinent = this._fetchContinent();
  }
  _fetchContinent = () => {
    let abortController;
    return (code, successCallback) => {
      const query = `query {
      continent(code: "${code}") {
        code
        name
        countries {
          name
          native
          phone
          currency
          emoji
          emojiU
        }
      }
    }`;
      try {
        if (abortController) {
          abortController.abort();
        }
      } catch (ex) {
        console.warn(ex);
      }
      abortController = new AbortController();
      let signal = abortController.signal;
      this.setState({ loader: true }, () => {
        fetch('https://countries.trevorblades.com/graphql', {
          method: 'POST',
          signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        })
          .then(res => res.json())
          .then(res => {
            this.setState({ loader: false });
            // console.log(res.data.continent);
            successCallback(res.data.continent);
          });
      });
    };
  };

  fetchContinentDetails = () => {
    let self = this;
    const query = `{
      continents {
        code
        name
      }
    }
    `;
    this.setState({ loader: true }, () => {
      // self.setState({ continents: data.continents, page, loader: false });
      fetchAPI({
        query
      }).then(res => {
        self.setState({ continents: res.data.continents, loader: false });
      });
    });
  };
  componentDidMount() {
    let self = this;
    this.fetchContinentDetails();
    window.onbeforeunload = function(e) {
      var e = e || window.event;
      let msg = 'Do you really want to leave this page?';
      self.setState({ details: {} });
      // window.confirm(msg);
      return msg;
    };
  }
  render() {
    const { continents, loader, details } = this.state;

    const detailsComponenent = continent => {
      return (
        <section>
          <Button
            onClick={() => {
              this.setState({ details: {} });
            }}
            variant="primary"
          >
            Go Back
          </Button>
          <br />
          <br />
          <Card style={{ width: '100%' }}>
            <Card.Header>
              {continent.name} - {continent.code}
            </Card.Header>
            <Card.Body>
              {continent.countries.map(country => {
                return (
                  <Card
                    bg="secondary"
                    text="white"
                    style={{
                      width: '18rem',
                      float: 'left',
                      marginRight: 20,
                      marginBottom: 20
                    }}
                  >
                    <Card.Header>
                      {country.name} -{' '}
                      <span style={{ fontSize: 20 }}>{country.emoji}</span>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        Name: {country.name}
                        <br />
                        Native: {country.native}
                        <br />
                        Phone: {country.phone}
                        <br />
                        Currency: {country.currency}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </Card.Body>
          </Card>
        </section>
      );
    };

    let renderViews =
      details && Object.keys(details).length === 0
        ? continents &&
          continents.map(continent => {
            return (
              <Card
                key={continent.code}
                style={{
                  width: '18rem',
                  margin: '20px',
                  cursor: 'pointer'
                }}
                onClick={() =>
                  this.fetchContinent(continent.code, details => {
                    // history.push('/details/' + continent.code);
                    this.setState({ details });
                  })
                }
              >
                <Card.Body>
                  <Card.Title>
                    {continent.name} - ({continent.code})
                  </Card.Title>
                </Card.Body>
                <Card.Body />
              </Card>
            );
          })
        : detailsComponenent(details);

    return (
      <Row className={'exploreView'}>
        {loader ? (
          <section style={{ position: 'fixed', left: 0 }}>
            <Loader type="Puff" color="#000" height="100" width="100" />
          </section>
        ) : (
          ''
        )}
        {renderViews}
      </Row>
    );
  }
}

export default withRouter(Dashboard);
