import React, { Fragment } from 'react';
import { Line } from 'react-chartjs-2';

const Stats = props => {

	const { choices = [], stats = {} } = props;
	const counts = choices.map(choice => stats[choice] || 0);

	const chartData = {
		labels: choices,
		datasets: [
			{
				lineTension: 0,
				backgroundColor: 'rgba(68, 204, 153, 0.05)',
				borderColor: 'rgba(68, 204, 153, 0.9)',
				borderWidth: 2,
				borderJoinStyle: 'round',
				pointRadius: 5,
				pointBorderColor: '#fff',
				pointBackgroundColor: 'rgba(68, 204, 153, 0.9)',
				pointBorderWidth: 3,
				data: counts
			}
		]
	};

	const chartOptions = {
		layout: { padding: { top: 25, bottom: 75, left: 75, right: 75 } },
		maintainAspectRatio: false,
		scales: {
			yAxes: [{
				ticks: { beginAtZero: true, display: false }
			}]
		},
		legend: { display: false },
		title: {
			display: true,
			text: 'POLL COUNTS',
			padding: 10,
			lineHeight: 4,
			fontSize: 20,
			fontColor: '#677'
		}
	};

  return (
    <Fragment>
      <div className="position-relative h-50 w-100 d-flex align-items-center border-bottom border-gray">
        <Line data={chartData} width={100} height={50} options={chartOptions} />
      </div>

      <div className="position-relative h-50 w-100 d-flex flex-wrap align-items-start align-content-start">

        <div className="d-flex flex-wrap w-100 text-center justify-content-center align-items-center align-content-center" style={{ height: 'calc(100% - 150px)' }}>

          <span className="d-block w-100 text-uppercase pb-2 font-weight-bold text-secondary" style={{ fontSize: '1.25rem' }}>Total Count</span>

          <span className="d-block w-100 text-dark" style={{ fontSize: '5rem' }}>
						{counts.reduce((total, count) => total + count, 0)}
					</span>

        </div>

        <div className="w-100 d-flex justify-content-between align-items-center text-center border-top border-gray" style={{ height: 100 }}>
          {
            counts.map((count, index) => {
              return <div key={index} className={`h-100 position-relative d-flex align-items-center ${index > 0 ? 'border-left border-gray' : ''}`} style={{ width: '20%', fontSize: '2rem' }}>
                <span className="d-block w-100 p-3 text-dark">{count}</span>
              </div>
            })
          }
        </div>

        <div className="w-100 d-flex justify-content-between align-items-center text-center border-top border-gray bg-light" style={{ height: 50 }}>
          {
            choices.map((choice, index) => {
              return <div key={index} className={`h-100 position-relative d-flex align-items-center ${index > 0 ? 'border-left border-gray' : ''}`} style={{ width: '20%', fontSize: '0.7rem' }}>
                <span className="d-block w-100 text-uppercase p-3 font-weight-bold text-secondary">{choice}</span>
              </div>
            })
          }
        </div>

      </div>
    </Fragment>
  );
};

export default Stats;
