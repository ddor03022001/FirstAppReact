import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';


class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: ''
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {
        let { currentDate } = this.state;
        return (
            <div className='manage-patient-container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            className="form-control"
                            value={this.state.currentDate}
                            onChange={this.handleOnChangeDatePicker}
                        />
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{ width: '100%' }}>
                            <tr>
                                <th>Name</th>
                                <th>Telephone</th>
                            </tr>
                            <tr>
                                <td>456456456</td>
                                <td>789789789</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
