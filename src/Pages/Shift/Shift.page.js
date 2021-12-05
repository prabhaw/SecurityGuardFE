import React, { useState, useEffect } from 'react'
import { eachDayOfInterval, format } from 'date-fns'
import { Row, Col, Divider, Spin, Button } from 'antd'
import dayjs from 'dayjs'
import { LeftOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../Redux/actions/modal.action'
import ShiftForm from './Shift.form'
import { setGuardValue } from '../../Redux/actions/add_guard.action'
import { fetchShiftByAdmin } from '../../Redux/actions/shift.action'
import json from './../../json/static.json'
import { useNavigate } from 'react-router'

const AddShiftList = () => {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date())
  const [verifyshift, setShift] = useState({})
  const { loading, shift } = useSelector((state) => state.shiftadmin)
  const dispathc = useDispatch()
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 6)),
  )
  useEffect(() => {
    var convert = shift.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [dayjs(item.shift_date).format('YYYY-MM-DD') +
          '-' +
          item.site +
          '-' +
          item.shift_number +
          '-' +
          item.user_num]: item,
        }),
      {},
    )
    setShift(convert)
    console.log(convert)
  }, [shift])
  useEffect(() => {
    dispathc(
      fetchShiftByAdmin({
        start_date: dayjs(startDate).subtract(1, 'day').format(),
        end_date: endDate,
      }),
    )
  }, [startDate, endDate])
  const PreviousDate = () => {
    setStartDate(new Date(startDate.setDate(startDate.getDate() - 1)))
    setEndDate(new Date(endDate.setDate(endDate.getDate() - 1)))
  }
  const NextDate = () => {
    setStartDate(new Date(startDate.setDate(startDate.getDate() + 1)))
    setEndDate(new Date(endDate.setDate(endDate.getDate() + 1)))
  }
  const PreviousWeek = () => {
    setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)))
    setEndDate(new Date(endDate.setDate(endDate.getDate() - 7)))
  }
  const NextWeek = () => {
    setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)))
    setEndDate(new Date(endDate.setDate(endDate.getDate() + 7)))
  }
  const openFormModa = (shift_date, shift_number, site, site_user) => {
    dispathc(
      setGuardValue({
        shift_date,
        shift_number,
        site,
        ...site_user,
      }),
    )
    dispathc(openModal(<ShiftForm update={false} />))
  }
  const openFormUpdate = (
    shift_date,
    shift_number,
    site,
    site_user,
    user_id,
  ) => {
    dispathc(
      setGuardValue({
        shift_date,
        shift_number,
        site,
        ...site_user,
        user_id,
      }),
    )
    dispathc(openModal(<ShiftForm update={true} />))
  }
  return (
    <div className="containers">
      <Button
        onClick={() => {
          navigate('/manage-shift')
        }}
        type="primary"
        size="large"
      >
        <LeftOutlined /> Back
      </Button>
      <Divider />
      <h2>{json['Manage Shift']}</h2>
      <div className="d-flex justify-content-end my-2 mx-4">
        <Button onClick={PreviousWeek} type="dashed" size="middle">
          {json['Previous Week']}
        </Button>
        <Button onClick={PreviousDate} type="dashed" size="middle">
          {json['Previous Day']}
        </Button>
        <Button onClick={NextDate} type="dashed" size="middle">
          {json['Next Day']}
        </Button>
        <Button onClick={NextWeek} type="dashed" size="middle">
          {json['Next Week']}
        </Button>
      </div>
      <Row
        justify="center"
        style={{ background: '#EFEFEF', paddingTop: '15px ' }}
      >
        <Col style={{ padding: '2px', textAlign: 'center' }} xs={2}>
          <h4>{json['storage']}</h4>
        </Col>

        {eachDayOfInterval({
          start: startDate,
          end: endDate,
        }).map((item, i) => (
          <Col
            key={i}
            xs={3}
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            <p
              className={`${
                dayjs(item).format('ddd') === 'Sun' ||
                dayjs(item).format('ddd') === 'Sat'
                  ? 'text-danger'
                  : ''
              }`}
            >
              {dayjs(item).format('ddd DD MMM ')}
            </p>
          </Col>
        ))}
      </Row>

      {!loading ? (
        <>
          <Row
            justify="center"
            gutter={6}
            style={{ marginTop: '5px', padding: '15px', background: '#eeee' }}
          >
            <Col
              style={{
                padding: '4px 2px',
                justifyContent: 'center',
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
              }}
              xs={2}
            >
              <h4>{json.storage} A</h4>
            </Col>
            {eachDayOfInterval({
              start: startDate,
              end: endDate,
            }).map((item, i) => (
              <Col
                key={i}
                xs={3}
                style={{
                  font: 'inherit',
                  fontSize: '14px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                <div className={` d-flex flex-column`}>
                  {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-1-1'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          1,
                          'A',
                          {
                            user: 1,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-A-1-1'
                              ]?.id,
                          },
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-1'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-1'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-1'
                          ]?.holiday?.name_holiday,
                        )
                      }}
                      className={`${
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-1-1']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 1</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-1'
                          ]?.user?.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-1'
                          ]?.user?.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-1'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 06:00 - 14:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 1, 'A', {
                          user_num: 1,
                        })
                      }}
                      className={` table-data mb-2 d-flex flex-column`}
                    >
                      <strong>{json.shift} 1</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 06:00 - 14:00</small>
                    </div>
                  )}
                  {/* {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-1-2'] ? (
                    <div
                      onClick={() => {
                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 1, 'A', {
                        //   user_num: 2,
                        // })

                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          1,
                          'A',
                          {
                            user_num: 2,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-A-1-2'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-2'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-2'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-2'
                          ]?.holiday?.name_holiday,
                        )
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat' ||
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-1-2']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 1</strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-2'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-2'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-1-2'
                          ]?.user.last_name
                        }
                      </strong>
                      <small className="my-2"> 06:00 - 14:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 1, 'A', {
                          user_num: 2,
                        })
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat'
                          ? 'bg-holiday'
                          : ''
                      } table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 1</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 06:00 - 14:00</small>
                    </div>
                  )} */}

                  {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-2-1'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          2,
                          'A',
                          {
                            user_num: 1,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-A-2-1'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-1'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-1'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-1'
                          ]?.holiday?.name_holiday,
                        )

                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'A')
                      }}
                      className={`${
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-2-1']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 2</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-1'
                          ]?.user?.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-1'
                          ]?.user?.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-1'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 14:00 - 22:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'A', {
                          user_num: 1,
                        })
                      }}
                      className={` table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 2</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 14:00 - 22:00</small>
                    </div>
                  )}
                  {/* {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-2-2'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          2,
                          'A',
                          {
                            user_num: 2,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-A-2-2'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-2'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-2'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-2'
                          ]?.holiday?.name_holiday,
                        )

                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'A')
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat' ||
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-2-2']
                          ?.is_holiday === true
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 2</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-2'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-2'
                          ]?.user.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-2-2'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 14:00 - 22:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'A', {
                          user_num: 2,
                        })
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat'
                          ? 'bg-holiday'
                          : ''
                      } table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 2</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 14:00 - 22:00</small>
                    </div>
                  )} */}

                  {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-3-1'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          3,
                          'A',
                          {
                            user_num: 1,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-A-3-1'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-1'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-1'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-1'
                          ]?.holiday?.name_holiday,
                        )

                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 3, 'A')
                      }}
                      className={`${
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-3-1']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 3</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-1'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-1'
                          ]?.user.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-1'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 22:00 - 06:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 3, 'A', {
                          user_num: 1,
                        })
                      }}
                      className={` table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 3</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 22:00 - 06:00</small>
                    </div>
                  )}
                  {/* {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-3-2'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          3,
                          'A',
                          {
                            user_num: 2,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-A-3-2'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-2'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-2'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-2'
                          ]?.holiday?.name_holiday,
                        )

                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 3, 'A')
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat' ||
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-A-3-2']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 3</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-2'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-2'
                          ]?.user.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-A-3-2'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 22:00 - 06:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 3, 'A', {
                          user_num: 2,
                        })
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat'
                          ? 'bg-holiday'
                          : ''
                      } table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 3</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 22:00 - 06:00</small>
                    </div>
                  )} */}
                </div>
              </Col>
            ))}
          </Row>
          <Divider />
          <Row
            justify="center"
            gutter={6}
            style={{ marginTop: '5px', background: '#E8F0F7', padding: '15px' }}
          >
            <Col
              style={{
                padding: '2px',
                justifyContent: 'center',
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
              }}
              xs={2}
            >
              <h4>{json.storage} B</h4>
            </Col>
            {eachDayOfInterval({
              start: startDate,
              end: endDate,
            }).map((item, i) => (
              <Col
                key={i}
                xs={3}
                style={{
                  font: 'inherit',
                  fontSize: '14px',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                <div className="d-flex flex-column">
                  {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-1-1'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          1,
                          'B',
                          {
                            user_num: 1,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-B-1-1'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-1'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-1'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-1'
                          ]?.holiday?.name_holiday,
                        )

                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 1, 'B')
                      }}
                      className={`${
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-1-1']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 1</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-1'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-1'
                          ]?.user.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-1'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 06:00 - 14:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 1, 'B', {
                          user_num: 1,
                        })
                      }}
                      className={` table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 1</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 06:00 - 14:00</small>
                    </div>
                  )}
                  {/* {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-1-2'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          1,
                          'B',
                          {
                            user_num: 2,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-B-1-2'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-2'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-2'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-2'
                          ]?.holiday?.name_holiday,
                        )
                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 1, 'B')
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat' ||
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-1-2']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 1</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-2'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-2'
                          ]?.user.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-1-2'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 06:00 - 14:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 1, 'B', {
                          user_num: 2,
                        })
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat'
                          ? 'bg-holiday'
                          : ''
                      } table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 1</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 06:00 - 14:00</small>
                    </div>
                  )} */}
                  {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-2-1'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          2,
                          'B',
                          {
                            user_num: 1,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-B-2-1'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-1'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-1'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-1'
                          ]?.holiday?.name_holiday,
                        )
                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'B')
                      }}
                      className={`${
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-2-1']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 2</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-1'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-1'
                          ]?.user.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-1'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 06:00 - 14:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'B', {
                          user_num: 1,
                        })
                      }}
                      className={` table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 2</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 14:00 - 22:00</small>
                    </div>
                  )}
                  {/* {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-2-2'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          2,
                          'B',
                          {
                            user_num: 2,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-B-2-2'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-2'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-2'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-2'
                          ]?.holiday?.name_holiday,
                        )
                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'B')
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat' ||
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-2-2']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg '
                      } table-data mb-2 d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 2</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-2'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-2'
                          ]?.user.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-2-2'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 06:00 - 14:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'B', {
                          user_num: 2,
                        })
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat'
                          ? 'bg-holiday'
                          : ''
                      } table-data mb-2 d-flex flex-column`}
                    >
                      <strong>{json.shift} 2</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 14:00 - 22:00</small>
                    </div>
                  )} */}

                  {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-3-1'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          3,
                          'B',
                          {
                            user_num: 1,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-B-3-1'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-1'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-1'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-1'
                          ]?.holiday?.name_holiday,
                        )
                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 3, 'B')
                      }}
                      className={`${
                        verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-3-1']
                          ?.is_holiday
                          ? 'bg-holiday'
                          : 'fill-bg'
                      } table-data mb-2  d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 3</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-1'
                          ].user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-1'
                          ].user.last_name
                        }
                      </strong>
                      <small>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-1'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 22:00 - 06:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 3, 'B', {
                          user_num: 1,
                        })
                      }}
                      className={` table-data mb-2 d-flex flex-column`}
                    >
                      <strong>{json.Shift} 3</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 22:00 - 06:00</small>
                    </div>
                  )}
                  {/* {verifyshift[dayjs(item).format('YYYY-MM-DD') + '-B-3-2'] ? (
                    <div
                      onClick={() => {
                        openFormUpdate(
                          dayjs(item).format('YYYY-MM-DD'),
                          2,
                          'B',
                          {
                            user_num: 2,
                            shift_id:
                              verifyshift[
                                dayjs(item).format('YYYY-MM-DD') + '-B-3-2'
                              ]?.id,
                          },

                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-2'
                          ]?.user_id,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-2'
                          ]?.is_holiday,
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-2'
                          ]?.holiday?.name_holiday,
                        )
                        // openFormModa(dayjs(item).format('YYYY-MM-DD'), 3, 'B')
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat'
                          ? 'bg-holiday'
                          : ''
                      } table-data mb-2 fill-bg d-flex flex-column`}
                    >
                      <strong className="my-2">{json.shift} 3</strong>
                      <strong>
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-2'
                          ]?.user.first_name
                        }{' '}
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-2'
                          ]?.user.last_name
                        }
                      </strong>
                      <small style={{ color: 'red' }}>
                        holiday:
                        {
                          verifyshift[
                            dayjs(item).format('YYYY-MM-DD') + '-B-3-2'
                          ]?.holiday?.name_holiday
                        }
                      </small>
                      <small className="my-2"> 22:00 - 06:00</small>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        openFormModa(dayjs(item).format('YYYY-MM-DD'), 2, 'B', {
                          user_num: 2,
                        })
                      }}
                      className={`${
                        dayjs(item).format('ddd') === 'Sun' ||
                        dayjs(item).format('ddd') === 'Sat'
                          ? 'bg-holiday'
                          : ''
                      } table-data mb-2 d-flex flex-column`}
                    >
                      <strong>Shift 3</strong>
                      <PlusCircleOutlined
                        style={{ fontSize: '28px', margin: '13px 0' }}
                      />

                      <small> 22:00 - 06:00</small>
                    </div>
                  )}*/}
                </div>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div className="d-flex justify-content-center my-5 py-5">
          <Spin size="large" />
        </div>
      )}
    </div>
  )
}

export default AddShiftList
