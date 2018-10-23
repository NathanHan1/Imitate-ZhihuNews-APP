import React, { Component } from 'react';
import styles from './header.less';
import { Icon } from 'antd';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'home'
        };
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
        }, 1000);
    }

    render() {
        return (
            <div className={styles.header}>
                <h1>
                    {this.props.latest.view === 'content' ? (
                        <Icon type="left" theme="outlined" style={{ color: '#fff' }} onClick={this.linkToHome.bind(this)} />
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
