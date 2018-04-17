import React, {PureComponent} from 'react'
import {Avatar, Button, Col, Dropdown, Icon, Menu, Row} from 'antd';
import MainRouter from './MainRouter'
import {Link} from 'react-router-dom'
import Config from './../../utils/config'

const SubMenu = Menu.SubMenu;

export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
        this.getSiderState = this.getSiderState.bind(this);
    }

    getSiderState = (data) => {
        this.setState({
            collapsed: data
        })
    };

    render() {
        return (
            <div style={styleSheet.body}>
                <Navbar
                    getSiderState={this.getSiderState}
                />
                <Sider
                    collapsed={this.state.collapsed}
                />
                <MainRouter/>
            </div>
        )
    }
}

class Sider extends React.Component {
    rootSubmenuKeys = keyArr;

    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            selectedKeys: ['sub1'],
        };
    }

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };


    render() {
        return (
            <div style={{width: 256, minHeight: '94%', position: 'absolute'}}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={this.state.selectedKeys}
                    defaultOpenKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    inlineCollapsed={this.props.collapsed}
                    style={{minHeight: '100%', position: 'absolute'}}
                >
                    {
                        sideBar && sideBar.map((data) => {
                            return (
                                !data.child ?
                                    <Menu.Item key={data.key} style={{display: data.show ? 'block' : 'none'}}>
                                        <Link to={data.routerUrl}>
                                            <Icon type={data.icon}/>
                                            <span>{data.name}</span>
                                        </Link>
                                    </Menu.Item>
                                    :
                                    <SubMenu
                                        key={data.key}
                                        title={<span><Icon type={data.icon}/><span>{data.name}</span></span>}
                                        style={{display: data.show ? 'block' : 'none'}}
                                    >
                                        {
                                            data.child && data.child.map((childData) => {
                                                return (
                                                    !childData.child ?
                                                        <Menu.Item
                                                            key={childData.key}
                                                            style={{display: childData.show ? 'block' : 'none'}}
                                                        >
                                                            {childData.name}
                                                        </Menu.Item>
                                                        :
                                                        <SubMenu
                                                            key={childData.key}
                                                            style={{display: childData.show ? 'block' : 'none'}}
                                                            title={childData.name}>
                                                            {
                                                                childData.child && childData.child.map((result) => {
                                                                    return (
                                                                        <Menu.Item key={result.key}
                                                                                   style={{display: result.show ? 'block' : 'none'}}>{result.name}</Menu.Item>
                                                                    )
                                                                })
                                                            }
                                                        </SubMenu>
                                                )
                                            })
                                        }
                                    </SubMenu>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}

class Navbar extends React.Component {
    state = {
        collapsed: false,
        logoSpan: 3,
        userIcon: 17
    };
    handleMenuClick = e => console.log(e);
    handleClick = () => {
        let logoSpan;
        let userIcon;
        let logo = document.getElementById('logo');
        let mainRouter = document.getElementById('mainRouter');
        if (!this.state.collapsed) {
            logo.innerHTML = Config.baseConfig.navbarTitleSmall;
            logoSpan = 1;
            userIcon = 19;
            mainRouter.className = 'mainRouterOff'
        } else {
            logo.innerHTML = Config.baseConfig.navbarTitleBig;
            logoSpan = 3;
            userIcon = 17;
            mainRouter.className = 'mainRouterOn'
        }
        this.setState({collapsed: !this.state.collapsed, logoSpan, userIcon});
        this.props.getSiderState(!this.state.collapsed);
    };

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1"><Link to={'/login'}>退出</Link></Menu.Item>
            </Menu>
        );
        return (
            <Row style={styleSheet.navBar} justify={'center'}>
                <Col span={this.state.logoSpan} style={{marginRight: 20}}><h1 id={'logo'} style={styleSheet.headerTitle}>{Config.baseConfig.navbarTitleBig}</h1>
                </Col>
                <Col span={1} style={{lineHeight: '42px'}}>
                    <Button type="primary" onClick={this.handleClick}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                    </Button>
                </Col>
                <Col span={2} offset={this.state.userIcon}>
                    <Dropdown overlay={menu}>
                        <Avatar icon="user"/>
                    </Dropdown>
                </Col>
            </Row>
        );
    }
}

const styleSheet = {
    body: {
        position: 'absolute',
        minHeight: '100vh',
        width: '100%',
        background: '#f0f2f5'
    },
    navBar: {
        padding: '8px 0',
        background: '#fff',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        zIndex: 1
    },
    headerTitle: {
        marginBottom: 0,
        textAlign: 'center'
    }
};
const sideBar = Config.sideBar.sideBarArr;
const keyArr = [];
for (let i in sideBar) {
    if (!sideBar[i]['child']) {
        keyArr.push(sideBar[i]['key'])
    } else {
        let oneChild = sideBar[i]['child'];
        for (let k in oneChild) {
            if (oneChild.hasOwnProperty(k)) {
                if (!oneChild[k]['child']) {
                    keyArr.push(oneChild[k]['key'])
                } else {
                    let twoChild = oneChild[k]['child'];
                    for (let j in twoChild) {
                        if (twoChild.hasOwnProperty(j)) {
                            keyArr.push(twoChild[j]['key'])
                        }
                    }
                }
            }
        }
    }
}
