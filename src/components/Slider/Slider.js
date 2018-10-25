import React, { Component } from 'react';
import styles from './Slider.less';

class Slider extends Component {
    constructor(props) {
        super();
        let width;
        if (document.body.clientWidth <= 900) {
            width = document.body.clientWidth;
        } else if (document.body.clientWidth > 900) {
            width = 500;
        }

        this.state = {
            url: 'https://goss3.vcg.com/creative/vcg/400/version23/VCG21gic',
            imgWidth: width,
            length: 5,
            index: 0
        };
        this.startX = 0;
        this.startL = 0;
        this.moveX = 0;
        this.linkToContentStartBoolean = 0;
    }

    linkToContentStart() {
        this.linkToContentStartBoolean = this.moveX;
    }

    linkToContent(id) {
        if (this.linkToContentStartBoolean === this.moveX) {
            this.props.dispatch({
                type: 'latest/setView',
                payload: {
                    view: 'content'
                }
            });

            window.location.hash = `/home/${id}`;
        } else {
            return;
        }
    }

    getArr() {
        return this.props.latest.stories
            .filter(item => {
                return item.id && true;
            })
            .map(item => {
                return (
                    <li
                        onTouchEnd={this.linkToContent.bind(this, item.id)}
                        onTouchStart={this.linkToContentStart.bind(this)}
                        key={item.id}
                    >
                        <img width={this.state.imgWidth + 'px'} src={`${this.state.url}${item.id}.jpg`} alt="" />
                        <p>{item.title}</p>
                    </li>
                );
            });
    }

    UNSAFE_componentWillMount() {
        this.props.dispatch({
            type: 'latest/createdAsync'
        });
    }

    componentWillUpdate() {
        this.refs.slider.style.width = this.state.length * this.state.imgWidth + 'px';
    }

    start(e) {
        e.preventDefault();
        this.refs.slider.style.transition = '';
        this.startX = e.touches[0].clientX;
        this.startL = this.refs.slider.offsetLeft;
    }

    move(e) {
        e.preventDefault();
        this.moveX = e.touches[0].clientX - this.startX;
        this.refs.slider.style.left = this.moveX + this.startL + 'px';
    }

    end(e) {
        e.preventDefault();
        //处理第一张和最后一张
        if (this.moveX > 0 && this.state.index === 0) {
            this.refs.slider.style.transition = '.5s';
            this.refs.slider.style.left = '';
            return;
        } else if (this.moveX < 0 && this.state.index === this.state.length - 1) {
            this.refs.slider.style.transition = '.5s';
            this.refs.slider.style.left = -(this.state.length - 1) * this.state.imgWidth + 'px';

            return;
        }

        //巧妙的实现上下滑动，省去了判断
        const num = Math.round(this.refs.slider.offsetLeft / this.state.imgWidth);
        this.refs.slider.style.transition = '.5s';
        this.refs.slider.style.left = num * this.state.imgWidth + 'px';
        this.setState({
            index: Math.abs(num)
        });
    }

    getDot() {
        const arr = [];
        for (let i = 0; i < this.state.length; i++) {
            arr.push(<li className={this.state.index === i ? `${styles.active}` : ''} key={i} />);
        }
        return arr;
    }

    render() {
        return (
            <div className={styles.wrap}>
                <ul
                    ref={'slider'}
                    className={styles.slider}
                    onTouchStart={this.start.bind(this)}
                    onTouchMove={this.move.bind(this)}
                    onTouchEnd={this.end.bind(this)}
                >
                    {this.getArr()}
                </ul>
                <ol className={styles.dot}>{this.getDot()}</ol>
            </div>
        );
    }
}

export default Slider;
