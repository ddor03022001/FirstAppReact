import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTimes: [],
            currentDate: new Date()
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        this.setArrDate(language);
        let formattedDate = new Date(this.state.currentDate).getTime();
        console.log("check doctor: ", this.props.doctorIdFromParent)
    }

    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    setArrDate = (language) => {
        let arrDates = []
        // for (let i = 0; i < 7; i++) {
        //     let object = {};
        //     if (language === LANGUAGES.VI) {
        //         let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
        //         object.label = this.capitalizeFirstLetter(labelVi);
        //         object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

        //     } else {
        //         object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
        //         object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
        //     }
        //     arrDates.push(object);
        // }
        for (let i = 0; i < 7; i++) {
            let object = {};
            let currentDate = moment(new Date()).add(i, 'days');

            if (language === LANGUAGES.VI) {
                let labelVi = currentDate.format('dddd - DD/MM');
                object.label = i === 0 ? 'Hôm nay' : this.capitalizeFirstLetter(labelVi);
                object.value = currentDate.startOf('day').valueOf();

            } else {
                object.label = i === 0 ? 'Today' : currentDate.locale('en').format('dddd - DD/MM');
                object.value = currentDate.startOf('day').valueOf();
            }
            arrDates.push(object);
        }

        this.setState({
            allDays: arrDates
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setArrDate(this.props.language);
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : []
                })
            }
        }
    }
    render() {
        let { allDays, allAvailableTimes } = this.state;
        let { language } = this.props;
        console.log("check time: ", this.state.allAvailableTimes)
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {
                            allDays &&
                            allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })}
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <i className="fas fa-calendar-alt">
                            <span>Lịch khám</span>
                        </i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTimes &&
                            allAvailableTimes.length > 0 ?
                            allAvailableTimes.map((item, index) => {
                                let timeDisplay = language === LANGUAGES.VI ?
                                    item.timeTypeData.valueVi :
                                    item.timeTypeData.valueEn
                                return (
                                    <button
                                        key={index}
                                    >
                                        {timeDisplay}
                                    </button>
                                )
                            })
                            :
                            <div>Không có lịch hẹn trong thời gian này</div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
