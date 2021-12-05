import React, { useState, useEffect } from 'react'
import json from './../../json/static.json'
import { useSelector, useDispatch } from 'react-redux'
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule'

import { fetchUserByGuard } from '../../Redux/actions/shift.action'
function applyCategoryColor(args, currentView) {
  var categoryColor = args.data.CategoryColor
  if (!args.element || !categoryColor) {
    return
  }
  if (currentView === 'Agenda') {
    args.element.firstChild.style.borderLeftColor = categoryColor
  } else {
    args.element.style.backgroundColor = categoryColor
  }
}

const GuardShiftPage = () => {
  const [formatedTime, setFormatedTime] = useState([])
  const dispatch = useDispatch()
  const shift = useSelector((state) => state.shiftadmin.shift_guard)
  useEffect(() => {
    dispatch(fetchUserByGuard())
  }, [])
  useEffect(() => {
    const dataout = shift.map((item) => {
      if (item.is_holiday) {
        return {
          Id: item.id,
          Subject: item.user?.first_name + ' ' + item.user?.last_name,
          StartTime: item.start_time,
          EndTime: item.end_time,
          CategoryColor: '#dd4949',
          Location: item.holiday?.name_holiday,
        }
      }

      return {
        Id: item.id,
        Subject: item.user?.first_name + ' ' + item.user?.last_name,
        StartTime: item.start_time,
        EndTime: item.end_time,
        CategoryColor: '#4ABEAE',
      }
    })
    setFormatedTime(dataout)
  }, [shift])

  // componentDidMount() {
  //   const { fetchShift, shift } = this.props
  //   fetchShift()
  //   this.setState((pre) => ({ ...pre, shiftData: shift }))
  // }
  const onEventRendered = (args) => {
    applyCategoryColor(args, formatedTime)
  }
  const onPopupOpen = (args) => {
    if (
      (args.target &&
        !args.target.classList.contains('e-appointment') &&
        args.type === 'QuickInfo') ||
      args.type === 'Editor'
    ) {
      args.cancel = onEventCheck(args)
    }
  }
  const onActionBegin = (args) => {
    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange' ||
      args.requestType === 'eventRemove'
    ) {
      args.cancel = onEventCheck(args)
    }
  }
  const onDragStop = (args) => {
    args.cancel = onEventCheck(args)
  }
  const onResizeStop = (args) => {
    args.cancel = onEventCheck(args)
  }
  const onEventCheck = (args) => {
    let eventObj = args.data instanceof Array ? args.data[0] : args.data
    return eventObj.StartTime < new Date()
  }

  return (
    <div className="containers  ">
      <div>
        <h3 className="my-4">{json['Time Shadule']}</h3>
      </div>
      <div className="schedule-control-section">
        <div className=" control-section">
          <div className="control-wrapper">
            <ScheduleComponent
              height="650px"
              // ref={(schedule) => (this.scheduleObj = schedule)}
              eventSettings={{ dataSource: formatedTime, fields: {} }}
              eventRendered={onEventRendered}
              popupOpen={onPopupOpen}
              actionBegin={onActionBegin}
              dragStop={onDragStop}
            >
              <ViewsDirective>
                <ViewDirective option="Day" />
                <ViewDirective option="Week" />
                <ViewDirective option="WorkWeek" />
                <ViewDirective option="Month" />
              </ViewsDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  WorkWeek,
                  Month,
                  Agenda,
                  Resize,
                  DragAndDrop,
                ]}
              />
            </ScheduleComponent>
          </div>
        </div>
        {/* <div className="col-lg-3 property-section">
          <PropertyPane title="Properties">
            <table
              id="property"
              title="Properties"
              className="property-panel-table"
              style={{ width: '100%' }}
            >
              <tbody>
                <tr style={{ height: '50px' }}>
                  <td style={{ width: '100%' }}>
                    <div className="datepicker-control-section">
                      <DatePickerComponent
                        value={new Date(2021, 0, 10)}
                        showClearButton={false}
                        change={this.change.bind(this)}
                        placeholder="Current Date"
                        floatLabelType="Always"
                      ></DatePickerComponent>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default GuardShiftPage
