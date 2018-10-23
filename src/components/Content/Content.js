import React, { Component } from 'react';
import styles from './Content.less';
import { connect } from 'dva';
import axios from 'axios';

class Content extends Component {
    constructor({ match }) {
        super();
        this.state = {
            image: '',
            body: '',
            title: '',
            url: 'https://goss3.vcg.com/creative/vcg/400/version23/VCG21gic'
        };
        this.lastScrollY = 248;
        this.lastImgY = 140;

        this.scrollHandlerBind = this.scrollHandler.bind(this);
    }

    getContent() {
        const url = `/api/${this.props.match.params.id}`;
        axios.get(url).then(({ data: { images, title, body } }) => {
            this.setState({
                image: images[0],
                body,
                title
            });
            this.refs.body.innerHTML = this.state.body;
            document.querySelector('.meta').style['font-size'] = 22 + 'px';
            document.querySelector('.meta').style['margin'] = `10px 0`;
            document.querySelector('.meta').style['color'] = `#444`;
            document.querySelector('.avatar').style['width'] = `24px`;
            document.querySelector('.avatar').style['height'] = `24px`;
        });
    }

    componentWillMount() {
        this.getContent();
    }

    componentDidMount() {
        document.addEventListener('scroll', this.scrollHandlerBind);

        // 过渡动画
        const _this = this;
        setTimeout(() => {
            _this.refs.wrapper.style.left = 0;
        }, 0);
    }

    scrollHandler() {
        const scrollY = window.scrollY;
        const img = this.refs.img;

        img.style.top = (scrollY / this.lastScrollY) * this.lastImgY + 'px';
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollHandlerBind);

    }

    render() {
        return (
            <div ref="wrapper" className={`${styles.content} content`}>
                <div className={styles.img} ref="img" style={{ top: 0 }}>
                    <img width="100%" src={`${this.state.url}${this.props.match.params.id}.jpg`} alt="" />
                    <h1>{this.state.title}</h1>
                </div>
                <div ref="body" className={styles.body} />
            </div>
        );
    }
}

export default connect(({ latest }) => ({ latest }))(Content);
