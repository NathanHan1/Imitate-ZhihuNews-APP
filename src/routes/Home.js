import { connect } from 'dva';
import Header from '../components/Header/Header';
import Slider from '../components/Slider/Slider';
import ContentList from '../components/ContentList/ContentList';
import styles from './Home.less';
import React, { Component } from 'react';
import Content from '../components/Content/Content';
import { Route } from 'dva/router';

class Home extends Component {
    render() {

        return (
            <div className={styles.home} style={{ paddingTop: 40 + 'px' }}>
                <Header match={this.props.match} latest={this.props.latest} dispatch={this.props.dispatch} />
                <Slider latest={this.props.latest} dispatch={this.props.dispatch} />
                <ContentList latest={this.props.latest} dispatch={this.props.dispatch} />
                <Route path={`/home/:id`} component={Content} />
            </div>
        );
    }
}

export default connect(({ latest }) => ({ latest }))(Home);
