import React, { Component } from 'react';
import styles from './ContentList.less';
import { Link } from 'dva/router';

class ContentList extends Component {
    constructor() {
        super();
        this.state = {
            url: 'https://goss3.vcg.com/creative/vcg/400/version23/VCG21gic',
            id: 0
        };
    }

    linkToContent(e) {
        console.log(e.target);
        this.props.dispatch({
            type: 'latest/setView',
            payload: {
                view: 'content'
            }
        });

        e.target.className = styles.active;
        
    }

    getContentArr() {
        const arr = this.props.latest.stories.map(item => {
            return (
                <Link key={item.id} to={`/home/${item.id}`}>
                    <li onClick={this.linkToContent.bind(this)}>
                        <p>{item.title}</p>
                        <img src={`${this.state.url}${item.id}.jpg`} alt="" />
                    </li>
                </Link>
            );
        });

        return arr;
    }

    render() {
        return (
            <div className={styles.contentlist}>
                <h2>今日新闻</h2>
                <ul>{this.getContentArr()}</ul>
            </div>
        );
    }
}

export default ContentList;
