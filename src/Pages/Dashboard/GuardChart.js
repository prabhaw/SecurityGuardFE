import { useState, useEffect } from 'react'
import { eachMonthOfInterval, sub } from 'date-fns'
import startOfYear from 'date-fns/startOfYear'
import endOfYear from 'date-fns/endOfYear'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import json from './../../json/static.json'
import faker from 'faker'
import dayjs from 'dayjs'
import httpClients from '../../utils/httpClients'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: json['Working Chart'],
    },
  },
}

const GuardChart = () => {
  const [startDate, setStartDate] = useState(startOfYear(new Date()))
  const [shift, setShift] = useState([])
  const [endDate, setEndDate] = useState(endOfYear(new Date()))

  const labels = eachMonthOfInterval({
    start: startDate,
    end: endDate,
  }).map((item) => dayjs(item).format('MMM'))

  useEffect(() => {
    httpClients
      .GET('/shift/bar-guard', true, { startDate, endDate })
      .then((out) => {
        setShift(out.data)
      })
      .catch((error) => {})
  }, [])

  const data = {
    labels,
    datasets: [
      {
        label: json['Shift One'],
        data: labels.map((month) => {
          return (
            shift.filter(
              (item) =>
                month === dayjs(item.shift_date).format('MMM') &&
                item.shift_number === 1,
            ).length * 8
          )
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: json['Shift Two'],
        data: labels.map((month) => {
          return (
            shift.filter(
              (item) =>
                month === dayjs(item.shift_date).format('MMM') &&
                item.shift_number === 2,
            ).length * 8
          )
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: json['Shift Three'],
        data: labels.map((month) => {
          return (
            shift.filter(
              (item) =>
                month === dayjs(item.shift_date).format('MMM') &&
                item.shift_number === 3,
            ).length * 8
          )
        }),
        backgroundColor: '#FEC134',
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export default GuardChart
