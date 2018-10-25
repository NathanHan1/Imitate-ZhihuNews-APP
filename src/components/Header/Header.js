import React, { Component } from 'react';
import styles from './header.less';
import { Icon } from 'antd';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'home'
        };

        this.startScroll = 0;

        this.scrollLast = 0;
    }

    linkToHome() {
        this.props.dispatch({
            type: 'latest/setView',
            payload: {
                view: 'home'
            }
        });

        const content = document.getElementsByClassName('content')[0];
        content.style.left = '100%';
        setTimeout(() => {
            window.location.hash = '/home';
        }, 500);
    }

    componentDidUpdate() {
        if (this.props.latest.view === 'content') {
            setTimeout(() => {
                const domContent = document.getElementsByClassName('content')[0];

                this.scrollLast = domContent.scrollTop;
                this.refs.header.style.opacity = 1;

                domContent.addEventListener('touchstart', () => {
                    this.startScroll = domContent.scrollTop;
                });

                domContent.addEventListener('touchmove', () => {
                    //startScroll是保存刚开始滑动的Y值
                    const header = this.refs.header;
                    if (domContent.scrollTop > this.scrollLast) {
                        if (header.style.opacity == 0) {
                            this.scrollLast = domContent.scrollTop;
                            this.startScroll = domContent.scrollTop;
                            return;
                        }
                        header.style.opacity = 1 - Math.abs(domContent.scrollTop - this.startScroll) / 120;

                        //归零
                        if (header.style.opacity < 0) header.style.opacity = 0;
                        header.style.opacity == 0 ? (this.startScroll = domContent.scrollTop) : '';
                    } else if (domContent.scrollTop < this.scrollLast) {
                        if (header.style.opacity == 1) {
                            this.scrollLast = domContent.scrollTop;
                            this.startScroll = domContent.scrollTop;
                            return;
                        }
                        header.style.opacity = Math.abs(domContent.scrollTop - this.startScroll) / 120;

                        //归1
                        if (header.style.opacity > 1) header.style.opacity = 1;

                        header.style.opacity == 1 ? (this.startScroll = domContent.scrollTop) : '';
                    }
                    this.scrollLast = domContent.scrollTop;
                });
            }, 0);
        }
    }

    componentDidMount() {
        if (document.body.clientWidth >= 900) {
            this.refs.header.style.width = '500px';
        } else if (document.body.clientWidth < 900) {
            this.refs.header.style.width = document.body.clientWidth + 'px';
        }
    }

    render() {
        return (
            <div className={styles.header} ref="header">
                <h1>
                    {this.props.latest.view === 'content' ? (
                        <Icon
                            type="left"
                            theme="outlined"
                            style={{ color: '#fff' }}
                            onClick={this.linkToHome.bind(this)}
                        />
                    ) : (
                        '首页'
                    )}
                </h1>
                <span>更多</span>
            </div>
        );
    }
}

export default Header;
