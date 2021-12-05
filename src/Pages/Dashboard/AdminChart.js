import { useState, useEffect } from 'react'
import randomColor from 'randomcolor'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Row, Col, DatePicker } from 'antd'
import { Bar } from 'react-chartjs-2'
import json from './../../json/static.json'
import dayjs from 'dayjs'
import httpClients from '../../utils/httpClients'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const AdminChart = () => {
  const [shift, setShift] = useState([])
  const [selectedDate, setSelectDate] = useState(new Date())
  const [data, setData] = useState({ datasets: [] })
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text:
          json['Working Statistic of'] +
          '-' +
          dayjs(selectedDate).format('YYYY'),
      },
    },
  }
  useEffect(() => {
    httpClients
      .GET('/shift/dash-shift-year', true, {
        date: dayjs(selectedDate).format('YYYY-MM-DD'),
      })
      .then((out) => {
        console.log(selectedDate)
        setShift(out.data)
      })
      .catch((error) => {})
  }, [selectedDate])
  //   console.log(
  //     shift.filter(
  //       (item) =>
  //         'Oct' === dayjs(item.shift_date).format('MMM') &&
  //         item.shift_number === 3,
  //     ),
  //   )

  useEffect(() => {
    const formatdata = shift?.map((item) => {
      return {
        label: item.gurd_name,
        data: { [item.gurd_name]: item.total * 8 },
        backgroundColor: randomColor(),
      }
    })

    setData({ datasets: formatdata })
  }, [shift])

  return (
    <>
      <Row justify="end" align="middle">
        <Col>
          <DatePicker
            onChange={(date) => {
              setSelectDate(date)
            }}
            picker="year"
          />
        </Col>
      </Row>
      <Bar options={options} data={data} />
    </>
  )
}

export default AdminChart
