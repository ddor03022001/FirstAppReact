import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/Hc-MbGIxz3o"
                            title="Dept- Van Gogh (Feat. Ashley Alisha) 1 hour loop"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        >
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            세상에 받아들여지지 못한 채
                            고독한 예술가로 살아야 했던
                            빈센트 반 고흐.

                            아무리 뛰어난 예술가라도
                            애정과 우정 없이는 공허한 삶이죠.

                            가난과 정신적인 고통,
                            비난과 무시 속에서도
                            자기만의 방식을 포기하지 않으며
                            완성해 나간 세계.

                            쉽지 않은 길을 걷는 우리에게도
                            그의 치열한 시간이
                            많은 용기와 위로가 되었으면 합니다.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
