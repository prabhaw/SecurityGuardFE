import { Divider } from 'antd'
import React, { useEffect, useState } from 'react'
import httpClients from '../../utils/httpClients'
import json from './../../json/static.json'
import GuardChart from './GuardChart'
import WorkingTableforGuard from './workigTableForGuard'

const GuardDash = () => {
  const [totalmontn, setTotalMonth] = useState(0)
  const [totalweek, setTotalWeek] = useState(0)
  useEffect(() => {
    httpClients
      .GET('/shift/total-guard', true, {})
      .then((out) => {
        setTotalMonth(out.data.saduleMonth)
        setTotalWeek(out.data.saduleWeek)
      })
      .catch((err) => {})
  }, [])
  return (
    <>
      <div className="row my-4">
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    {json['Working Hour']}
                  </h5>
                  <span className="h2 font-weight-bold mb-0">{totalmontn}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-nowrap">{json['Since last month']}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted mb-0">
                    {json['Working Hour']}
                  </h5>
                  <span className="h2 font-weight-bold mb-0">{totalweek}</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className="text-nowrap">{json['Since last Week']}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <GuardChart />
      </div>
      <Divider />
      <div className="my-4">
        <WorkingTableforGuard />
      </div>
    </>
  )
}

export default GuardDash
