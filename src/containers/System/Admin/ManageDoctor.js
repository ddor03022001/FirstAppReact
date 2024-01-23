import React, { Component, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './TableManageUser.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            selectedPrice: '',
            listPayment: [],
            selectedPayment: '',
            listProvince: [],
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS")
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {

            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);
            let dataSelectProvince = this.buildDataInputSelect(resProvince);

            console.log("data new: ", dataSelectPrice, dataSelectPayment, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveInforDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });

        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                ontentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
    }

    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }


    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="manage-doctor.create-doctor-information" />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="manage-doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id="manage-doctor.introducte_information" /></label>
                        <textarea className='form-control' s
                            onChange={(event) => this.handleOnchangeDesc(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.price" /></label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChange}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.payment" /></label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChange}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.province" /></label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChange}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.name-clinic" /></label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.address-clinic" /></label>
                        <input className='form-control' />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="manage-doctor.note" /></label>
                        <input className='form-control' />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                >
                    {
                        hasOldData === true ?
                            <span><FormattedMessage id="manage-doctor.save-information" /></span> :
                            <span><FormattedMessage id="manage-doctor.create-information" /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveInforDoctor: (data) => dispatch(actions.saveInforDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
