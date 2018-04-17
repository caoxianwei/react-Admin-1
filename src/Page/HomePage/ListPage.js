import React, {Component} from 'react';
import axios from 'axios'
import api from '../../api/index'
import Search from './../../utils/Search'
import {Button, Checkbox, Col, Dropdown, Icon, Menu, Row,Popconfirm} from 'antd'
import * as util from '../../utils/localStorageUtils'
import SearchComponent from './../../Component/Search/Search'
import Table from './../../Component/Table/Table'
import Modal from './../../Component/Modal/Modal'
import Config from "../../utils/config";

const sexTag =  util.localItem('localData') !== null ? JSON.parse(util.localItem('localData')).constant_sex : [];
const isDelete = util.localItem('localData') !== null ? JSON.parse(util.localItem('localData')).constant_is_delete : [];
const address = util.localItem('addressList') !== null ? JSON.parse(util.localItem('addressList')) : [];
const interest = util.sessionItem('sessionData') !== null ? JSON.parse(util.sessionItem('sessionData')).constant_interest : [];
const userRole = util.sessionItem('sessionData') !== null ? JSON.parse(util.sessionItem('sessionData')).constant_user_role : [];

export default class SpecialList extends Component {
    constructor() {
        super();
        this.state = {
            //table data
            dataSource: [],
            pagination: {},
            total: 0,
            page: 1,
            loading: false,
            selected: [],
            //search condition
            searchCondition: {
                cons: undefined,
                page: 1,
                rows: 10,
                sidx: 'created',
                sord: 'desc',
            },
            defaultValue:{},
            disabled:false,
            //settingBtn
            visible: false,
            //setting switch
            switch: true,
	        expand:false

        };
        this.getSearchData = this.getSearchData.bind(this);
        this.getCurPage = this.getCurPage.bind(this);
        this.getPageSize = this.getPageSize.bind(this);
        this.getSelected = this.getSelected.bind(this);
        this.columns = [
            {index: 0, fixed: 'left',width:100  , title: '用戶名', key: 'username', dataIndex: 'username'},
            {index: 1, title: '手机号码', key: 'telephone', dataIndex: 'telephone'},
            {index: 2, title: '邮箱', key: 'email', dataIndex: 'email'},
            {index: 3, title: '居住城市', key: 'home_address_label', dataIndex: 'home_address_label',render:(text,record) =>{
                return(
                    <span>{record.home_address_label[0]+'-'+record.home_address_label[1]+'-'+record.home_address_label[2]}</span>
                )
            }},
            {index: 4, title: '兴趣', key: 'interest', dataIndex: 'interest',render:(text,record)=>{
                return (
                    text && text.map((item, index2) => {
                        return(
                            interest && interest.map((data,index) => {
                                return(
                                    <span key={index}>{data.value === item ? ' - ' + data.label  : '' }</span>
                                )
                            })
                        )
                    })
                );
            }},
            {index: 5, title: '性别', key: 'gender', dataIndex: 'gender',render:(text,record)=>{
                return (
                    sexTag && sexTag.map((data,index)=>{
                        return(
                            <span key={index}>{data.value === record.gender+'' ? data.label : '' }</span>
                        )
                    })
                );
            }},
            {index: 6, title: '所属系统角色', key: 'user_role', dataIndex: 'user_role',render:(text,record)=>{
                return (
                    record.user_role && record.user_role.map((item, index2) => {
                        return(
                            userRole && userRole.map((data,index) => {
                                return(
                                    <span key={index}>{data.value === item ? ' - ' + data.label  : '' }</span>
                                )
                            })
                        )
                    })
                );
            }},
            {index: 7, title: '创建时间', key: 'create_datetime', dataIndex: 'create_datetime'},
            {index: 8, title: '是否删除', key: 'is_delete', dataIndex: 'is_delete',render:(text,record)=>{
                return(
                    isDelete && isDelete.map((data,index)=>{
                        return(
                            <span key={index}>{text+'' === data.value ? data.label : ''}</span>
                        )
                    })
                )
            }},
            {
                index: 9, fixed: 'right', width:230 , title: '操作', key: 'operation', dataIndex: 'operation', render: (text, record) => {
                    return (
                        this.operation(text, record)
                    )
                }
            }
        ];
        this.cloneColumns = [
            {index: 0, fixed: 'left',width:100  , title: '用戶名', key: 'username', dataIndex: 'username'},
            {index: 1, title: '手机号码', key: 'telephone', dataIndex: 'telephone'},
            {index: 2, title: '邮箱', key: 'email', dataIndex: 'email'},
            {index: 3, title: '居住城市', key: 'home_address_label', dataIndex: 'home_address_label',render:(text,record) =>{
                    return(
                        <span>{record.home_address_label[0]+'-'+record.home_address_label[1]+'-'+record.home_address_label[2]}</span>
                    )
                }},
            {index: 4, title: '兴趣', key: 'interest', dataIndex: 'interest',render:(text,record)=>{
                    return (
                        text && text.map((item, index2) => {
                            return(
                                interest && interest.map((data,index) => {
                                    return(
                                        <span key={index}>{data.value === item ? ' - ' + data.label  : '' }</span>
                                    )
                                })
                            )
                        })
                    );
                }},
            {index: 5, title: '性别', key: 'gender', dataIndex: 'gender',render:(text,record)=>{
                    return (
                        sexTag && sexTag.map((data,index)=>{
                            return(
                                <span key={index}>{data.value === record.gender+'' ? data.label : '' }</span>
                            )
                        })
                    );
                }},
            {index: 6, title: '所属系统角色', key: 'user_role', dataIndex: 'user_role',render:(text,record)=>{
                    return (
                        record.user_role && record.user_role.map((item, index2) => {
                            return(
                                userRole && userRole.map((data,index) => {
                                    return(
                                        <span key={index}>{data.value === item ? ' - ' + data.label  : '' }</span>
                                    )
                                })
                            )
                        })
                    );
                }},
            {index: 7, title: '创建时间', key: 'create_datetime', dataIndex: 'create_datetime'},
            {index: 8, title: '是否删除', key: 'is_delete', dataIndex: 'is_delete',render:(text,record)=>{
                    return(
                        isDelete && isDelete.map((data,index)=>{
                            console.log(text);
                            return(
                                <span key={index}>{text+'' === data.value ? data.label : ''}</span>
                            )
                        })
                    )
                }},
            {
                index: 9, fixed: 'right', width:230 , title: '操作', key: 'operation', dataIndex: 'operation', render: (text, record) => {
                    return (
                        this.operation(text, record)
                    )
                }
            }
        ];
        this.menu = (
            <Menu onClick={this.menuClick}>
                <Menu.Item key="1">批量删除</Menu.Item>
                <Menu.Item key="2">批量审核</Menu.Item>
            </Menu>
        );
        this.settingMenu = (
            <Menu>
                {
                    this.columns.map((item, index) => {
                        return (
                            <Menu.Item key={index}>
                                <Checkbox defaultChecked={true}
                                          onChange={this.handleMenuClick.bind(this, this.columns, index)}
                                          value={item.title}>
                                    {item.title}
                                </Checkbox>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        )
    }

    //生命周期
    componentWillMount() {
	    this.getTableList();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
    }

    //生命周期
	editBtn = (record) => {
        this.setState({defaultValue: record});
        this.modal.showModal();
	};
    detailBtn = (record) => {
        this.setState({defaultValue: record,disabled:true});
        this.modal.showModal();
    };
    //=============== 自定义操作按钮 start ==================
    operation = (text, record) => {
        return (
            <span>
				<Button onClick={this.editBtn.bind(this,record)}>修改</Button>
			    <span> </span>
				<Button onClick={this.detailBtn.bind(this,record)}>详情</Button>
			    <span> </span>
                <Popconfirm title="确 认 删 除？" okText=" 确认 " cancelText=" 取消 ">
                    <Button type={'danger'}>删除</Button>
                </Popconfirm>
	        </span>
        )
    };
    //=============== 自定义操作按钮 end ==================

    compare = (property) => {
        return function (a, b) {
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;
        };
    };
    handleMenuClick = (columns, index, e) => {
        if (e.target.checked) {
            //true 勾选
            this.cloneColumns.map((item) => {
                if (item.title === e.target.value) {
                    return columns.push(item)
                }
	            return true;
            });
            columns.sort(this.compare('index'));
        } else {
            //true 不勾选
            columns.map((item, i) => {
                if (item.title === e.target.value) {
                    return columns.splice(i, 1)
                }
	            return true;
            });
        }
        this.setState({switch: !this.state.switch})
    };


    //=============== 发送请求获取list数据 start ==================
    getTableList = () => {
        this.setState({loading: true});
        axios.post(api.user.list, {})
            .then((res) => {
                res.data.result.items.map(item => item.key = item.id);
                this.setState({
                    loading: false,
                    dataSource: res.data.result.items,
                    total: res.data.result.total_count,
                    page: res.data.result.page_index,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    };
    //=============== 发送请求获取list数据 end ==================

    //=============== 点击搜索触发从search组件获得填写的数据(数据还没经过处理) start ==================
    getSearchData = data => {
        let arr = [];
        arr.push(Search('specimenCoding', 'like', data['specimenCoding']));

        let cons = JSON.stringify(arr);
        let searchCondition = Object.assign(this.state.searchCondition, {cons: cons});
        this.setState({searchCondition: searchCondition}, () => {
            this.getTableList()
        });
    };
    //=============== 点击搜索触发从search组件获得填写的数据(数据还没经过处理) end ==================

    //=============== 分页器 start ==================
    getCurPage = page => {
        let searchCondition = Object.assign(this.state.searchCondition, {page: page});
        this.setState({searchCondition: searchCondition}, () => {
            this.getTableList()
        })
    };
    getPageSize = rows => {
        let searchCondition = Object.assign(this.state.searchCondition, {rows: rows});
        this.setState({searchCondition: searchCondition}, () => {
            this.getTableList()
        })
    };
    //=============== 分页器 end ==================

    //=============== 获得勾选了那些列表函数 start ==================
    getSelected = data => {
        this.setState({selected: data})
    };
    //=============== 获得勾选了那些列表函数 end==================

    //=============== 自定义操作事件 start==================
    menuClick = e => {
        console.log(e)
    };
    clearSelect = () => {
        this.child.clearSelect()
    };
    getChild = (ref) => {
        this.child = ref;
    };
    //下拉菜单点击不关闭
    handleVisibleChange = (flag) => {
        this.setState({visible: flag});
    };

	showSearch = () => {
		this.setState({expand: !this.state.expand})
	};

    //=============== 自定义操作事件 end==================

    //=============== 获取modal组件 start==================
    getModal = (ref) => {
        this.modal = ref;
    };
    modalClose = (data) => {
        this.setState({
            defaultValue:{},
            disabled:false,
        })
    };
    //=============== 获取modal组件 end==================

    //=============== 新建 start==================
    newPage = () => {
        this.modal.showModal()
    };
    //=============== 新建 end==================
    render() {
        return (
            <div style={{padding: "0 1%", marginBottom: 20}} className="col-xs-12">
                <Modal
                    getModal={this.getModal}
                    title={'新建标题'}
                    defaultValue={this.state.defaultValue}
                    disabled={this.state.disabled}
                    modalClose={this.modalClose}
                    modalContent={[
                        {name: '用户名',rules:{required:false}, type: 'input', id: 'username',defaultValue:'张觉恩'},
                        {name: '手机号码',rules:{required:false}, type: 'input', id: 'telephone',defaultValue:'张觉恩'},
                        {name: '邮箱', type: 'input',rules:{required:false}, id: 'email',defaultValue:'这是一段介绍'},
                        {name: '居住城市', isRequired: false, id: 'home_address', type: 'cascader',option:address},
                        {name: '兴趣', isRequired: false, type: 'checkbox', id: 'interest',option:interest},
                        {
                            name: '性别',
                            isRequired: false,
                            id: 'gender',
                            type: 'radio',
                            defaultValue:'0',
                            option: sexTag
                        },
                        {
                            name: '所属系统角色',
                            isRequired: false,
                            isMultiple: true,
                            type: 'select',
                            id: 'user_role',
                            option: userRole
                        },
                        {name: '创建时间', isRequired: false, id: 'create_datetime', type: 'timePicker'},
                        {name: '是否删除', isRequired: false, id: 'is_delete', type: 'switch' ,option:['是','否']},
                    ]}
                />
                <div className="list listCard">
                    {/*---- 页面标题 ----start*/}
                    <Row gutter={24} className="ListHeader">
                        <Col span={5}>{Config.baseConfig.listpageTitle}</Col>
                        {/*---- 页面操作 ----start*/}
                        <Col span={19} style={{textAlign: 'right'}}>
                            <Button onClick={this.clearSelect}
                                    style={{display: this.state.selected.length === 0 ? 'none' : 'inline-block'}}>{`清空 ${this.state.selected.length} 条`}</Button>
                            <span> </span>
                            <Dropdown overlay={this.menu}>
                                <Button style={{display: this.state.selected.length === 0 ? 'none' : 'inline-block'}}>
                                    批量操作 <Icon type="down"/>
                                </Button>
                            </Dropdown>
	                        <span> </span>
                            <Button onClick={this.showSearch} type={'primary'}><Icon type={'search'}/>查询</Button>
                            <span> </span>
                            <Button onClick={this.newPage} type={'primary'}><Icon type={'plus'}/>新建</Button>
                            <span> </span>
                            <Dropdown
                                overlay={this.settingMenu}
                                trigger={['click']}
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Button><Icon type={'setting'}/></Button>
                            </Dropdown>
                        </Col>
                        {/*---- 页面操作 ----end*/}
                    </Row>
                    {/*---- 页面标题 ----end*/}
                    {/*---- 搜索 ----start*/}
                    <div className={'listSearch'}>
                        <SearchComponent
                            SearchType={[
                                {name: '样品编码', id: 'specimenCoding', type: 'input'},
                                {
                                    name: '土地类型',
                                    id: 'terrainType',
                                    type: 'select',
                                    option: [{key: '0', value: '平原'}, {key: '1', value: '丘陵'}]
                                },
                                {
                                    name: '土地类型多选',
                                    id: 'multiple',
                                    type: 'select',
                                    option: [{key: '0', value: '平原'}, {key: '1', value: '丘陵'}],
                                    isMultiple: true
                                },
                                {name: '创建时间', id: 'time', type: 'timePicker'},
                                {name: '创建时间', id: 'timeRange', type: 'timeRange'},
                            ]}
                            expand={this.state.expand}
                            getSearchData={this.getSearchData}
                        />
                    </div>
                    {/*---- 搜索 ----end*/}
                    {/*---- Table ----start*/}
                    <div className={'listTable'}>
                        <Table
	                        columns={this.columns}
                            dataSource={this.state.dataSource}

                            getCurPage={this.getCurPage}
                            getPageSize={this.getPageSize}
                            getSelected={this.getSelected}
                            getChild={this.getChild}
                            setSelect={this.setSelect}
                            current={this.state.page}
                            total={this.state.total}
                            records={this.state.records}
                            loading={this.state.loading}
                        />
                    </div>
                    {/*---- Table ----end*/}
                </div>
            </div>
        )
    }
}