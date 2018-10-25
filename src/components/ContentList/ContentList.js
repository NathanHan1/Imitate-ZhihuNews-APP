import React, { Component } from 'react';
import styles from './ContentList.less';
import { Spin } from 'antd';

class ContentList extends Component {
    constructor() {
        super();
        this.state = {
            url: 'https://goss3.vcg.com/creative/vcg/400/version23/VCG21gic',
            id: 0
            //是否可以请求更多
        };

        this.homeHeight = 0;
        this.clientHeight = document.body.clientHeight;

        //今天
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;
        this.day = new Date().getDate();
    }

    linkToContent(id, e) {
        console.log('被点击了');

        window.scrollTo(0, 0);
        this.props.dispatch({
            type: 'latest/setView',
            payload: {
                view: 'content'
            }
        });
        window.location.hash = `/home/${id}`;
        e.target.className = styles.active;
    }

    componentDidUpdate() {
        this.homeHeight = this.refs.contentlist.offsetHeight + 270;

        //滚动到底部加载过去的新闻
        document.body.getElementsByClassName('home')[0].addEventListener('touchmove', () => {
            if (
                this.props.latest.getMore &&
                document.body.getElementsByClassName('home')[0].scrollTop >= this.homeHeight - this.clientHeight
            ) {
                console.log('到底了');

                this.props.dispatch({
                    type: 'latest/handleGetMore',
                    payload: false
                });
                //将字符日月转成数字
                this.day = parseInt(this.day);
                this.month = parseInt(this.month);
                if (this.day === 1) {
                    this.month--;
                    this.day = new Date(this.year, this.month, 0).getDate();
                } else {
                    this.day--;
                }
                //给10以下的日子和月份前面加“0”,才能成功请求

                this.day < 10 ? (this.day = `0${this.day}`) : '';
                this.month < 10 ? (this.month = `0${this.month}`) : '';

                this.props.dispatch({
                    type: 'latest/getLastDataAsync',
                    payload: {
                        year: this.year,
                        month: this.month,
                        //昨天
                        day: this.day
                    }
                });
            }
        });
    }

    getContentArr() {

        const arr = this.props.latest.stories.map(item => {
            if (item.today) {
                return <h2 key={item.today}>今日新闻</h2>;
            }
            if (item.year) {
                return (
                    <h2 key={`${item.year}${item.month}${item.day}`}>
                        {`${item.year}年${item.month}月${item.day}日的新闻`}
                    </h2>
                );
            }

            return (
                <li key={item.id} onClick={this.linkToContent.bind(this, item.id)}>
                    <p>{item.title}</p>
                    <img src={`${this.state.url}${item.id}.jpg`} alt="" />
                </li>
            );
        });

        return arr;
    }

    render() {
        return (
            <div ref="contentlist" className={styles.contentlist}>
                {this.props.latest.getMore === false ? (
                    <Spin className={styles.loading} size={'large'} tip="加载中..." />
                ) : (
                    ''
                )}
                <ul ref="ul">{this.getContentArr()}</ul>
            </div>
        );
    }
}

export default ContentList;
