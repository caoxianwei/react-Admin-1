import React, {Component} from 'react'
import {Breadcrumb} from 'antd';
import ListPage from './ListPage'
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import './mainRouter.css'

class Text extends Component{
    render(){
        return(
            <h1>hello world</h1>
        )
    }
}

class HomePage extends Component {
    render() {
        return (
            <div id={'mainRouter'} className={'mainRouterOn'}>
                <Home/>
                <Switch>
                    <Route path={'/homePage/listPage'} component={ListPage}/>
                    <Route path={'/homePage/listPage1'} component={Text}/>
                    <Redirect from="/homePage" to="/homePage/listPage"/>
                </Switch>
            </div>
        )
    }
}

const breadcrumbNameMap = {
    '/homePage': '首頁',
    '/homePage/listPage': '用戶列表',
};
const Home = withRouter((props) => {
    const {location} = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <span>
                    {breadcrumbNameMap[url]}
                </span>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [].concat(extraBreadcrumbItems);
    return (
        <div className="demo" style={{marginLeft: '24px'}}>
            <Breadcrumb>
                {breadcrumbItems}
            </Breadcrumb>
        </div>
    );
});
export default HomePage