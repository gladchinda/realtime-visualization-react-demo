import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import Poll from '../components/Poll';
import Stats from '../components/Stats';
import Layout from '../components/Layout';

class IndexPage extends Component {

	state = { answers: {} }

	componentDidMount() {
		this.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
			cluster: process.env.PUSHER_APP_CLUSTER,
			encrypted: true
		});

		this.channel = this.pusher.subscribe('poll-board');

		this.channel.bind('new-answer', ({ choice, count }) => {
			let { answers } = this.state;
			answers = { ...answers, [choice]: count };
			this.setState({ answers });
		});

		this.pusher.connection.bind('connected', () => {
			axios.post('/answers')
				.then(response => {
					const answers = response.data.answers;
					this.setState({ answers });
				});
		})
	}

	componentWillUnmount() {
		this.pusher.disconnect();
	}

  render() {

		const question = `Which is the largest continent in the world by population?`;
		const choices = ['Africa', 'Asia', 'Europe', 'North America', 'South America'];

    return (
      <Layout pageTitle="Realtime Data Visualization">
        <main className="container-fluid position-absolute h-100 bg-light">
          <div className="row position-absolute w-100 h-100">

            <section className="col-md-7 d-flex flex-row flex-wrap align-items-center align-content-center px-5 border-right border-gray">
              <div className="px-5 mx-5">
								<Poll question={question} choices={choices} />
              </div>
            </section>

            <section className="col-md-5 position-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-white px-0">
							<Stats choices={choices} stats={this.state.answers} />
            </section>

          </div>
        </main>
      </Layout>
    );
  }

};

export default () => (
	<Fragment>
		<IndexPage />
		<style global jsx>{`

			.custom-control-label {
				background: transparent;
				color: #999;
				font-size: 2rem;
				font-weight: 500;
				cursor: pointer;
				line-height: 2.25rem;
			}

			.custom-control-label:before, .custom-control-label:after {
				top: 0;
				left: -10px;
				height: 2.25rem;
				width: 2.25rem;
				cursor: pointer;
				box-shadow: none !important;
			}

			.custom-control-label.checked {
				color: #007bff !important;
			}

			button.btn {
				letter-spacing: 1px;
				font-size: 1rem;
				font-weight: 600;
			}

		`}</style>
	</Fragment>
);
