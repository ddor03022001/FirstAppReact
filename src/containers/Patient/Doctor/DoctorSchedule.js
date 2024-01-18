import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
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
        let allDays = this.getArrDays(language);
        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays
            })
        }
    }

    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getArrDays = (language) => {
        let allDays = []
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
            allDays.push(object);
        }

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTimes: res.data ? res.data : []
            })
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
                            <span><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </i>
                    </div>
                    <div className='time-content'>
                        {allAvailableTimes &&
                            allAvailableTimes.length > 0 ?
                            <>
                                <div className='time-content-btn'>
                                    {allAvailableTimes.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi :
                                            item.timeTypeData.valueEn
                                        return (
                                            <button
                                                className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                key={index}
                                            >
                                                {timeDisplay}
                                            </button>
                                        )
                                    })
                                    }
                                </div>
                                <div className='book-free'>
                                    <span><FormattedMessage id="patient.detail-doctor.choose" /><i className='far fa-hand-point-up'></i><FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                </div>
                            </>
                            :
                            <div className='no-schedule'>
                                <FormattedMessage id="patient.detail-doctor.no-schedule" />
                            </div>
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
