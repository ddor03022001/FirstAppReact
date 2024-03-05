import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { FormattedMessage } from 'react-intl';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';


class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleShowHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'> ĐỊA CHỈ KHÁM </div>
                    <div className='name-clinic'> Phòng khám quận 7 </div>
                    <div className='address-clinic'> 159 Trần Trọng Cung - quận 7 - Hồ Chí Minh </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div>
                            Giá khám. <span onClick={() => this.handleShowHideDetailInfor(true)}>xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div>Giá khám. 250.000đ</div>
                            <span onClick={() => this.handleShowHideDetailInfor(false)}>Ẩn bảng giá</span>
                        </>

                    }

                    <div></div>
                    <div></div>
                    <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
