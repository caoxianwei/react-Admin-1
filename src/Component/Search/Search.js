import React, {Component} from 'react';

import {Button, Col, DatePicker, Form, Input, Row, Select,} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: this.props.expand | false,
        }
    }

    //生命周期
    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
    }

    //生命周期

    //=============== 自定义函数 ==================start
    deleteUndefined = data => {
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                if (typeof data[i] === 'undefined') {
                    delete data[i]
                }
            }
        }
        return data
    };
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values = this.deleteUndefined(values);
            this.props.SearchType && this.props.SearchType.map((data) => {
                return (
                    data.type === 'timePicker' && values[data.id] !== undefined ?
                        values[data.id] = values[data.id].format('YYYY-MM-DD HH:mm:ss')
                        : data.type === 'timeRange' && values[data.id] !== undefined ?
                        values[data.id] = [
                            values[data.id][0].format('YYYY-MM-DD HH:mm:ss'),
                            values[data.id][1].format('YYYY-MM-DD HH:mm:ss')
                        ]
                        : ''
                )
            });
            //传数据给父组件
            this.props.getSearchData(values);
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };
    toggle = () => {
        const {expand} = this.state;
        this.setState({expand: !expand});
    };

    //=============== 自定义函数 ==================end
    render() {
        const length = this.props.SearchType.length;
        const count = this.props.expand ? length : 0;
        const {getFieldDecorator} = this.props.form;
        return (
            this.props.expand ?
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={24}>
                        {
                            this.props.SearchType && this.props.SearchType.map((data, index) => {
                                return (
                                    data.type === 'input' ?
                                        <Col span={8} key={index} style={{
                                            display: index < count ? 'block' : 'none',
                                            padding: styleSheet.padding
                                        }}>
                                            <FormItem label={`${data.name}`}>
                                                {getFieldDecorator(`${data.id}`)(
                                                    <Input/>
                                                )}
                                            </FormItem>
                                        </Col>
                                        : data.type === 'select' ?
                                        <Col span={8} key={index} style={{
                                            display: index < count ? 'block' : 'none',
                                            padding: styleSheet.padding
                                        }}>
                                            <FormItem label={`${data.name}`}>
                                                {getFieldDecorator(`${data.id}`)(
                                                    <Select mode={data.isMultiple === true ? 'multiple' : ''}>
                                                        {
                                                            data.option && data.option.map((result, index2) => {
                                                                return (
                                                                    <Option key={result.id + index2}
                                                                            value={result.key}>{result.value}</Option>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        : data.type === 'timePicker' ?
                                            <Col span={8} key={index} style={{
                                                display: index < count ? 'block' : 'none',
                                                padding: styleSheet.padding
                                            }}>
                                                <FormItem label={`${data.name}`}>
                                                    {getFieldDecorator(`${data.id}`)(
                                                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                                                                    placeholder={'选择时间'}
                                                                    style={{width: '100%'}}/>
                                                    )}
                                                </FormItem>
                                            </Col>
                                            : data.type === 'timeRange' ?
                                                <Col span={8} key={index} style={{
                                                    display: index < count ? 'block' : 'none',
                                                    padding: styleSheet.padding
                                                }}>
                                                    <FormItem label={`${data.name}`}>
                                                        {getFieldDecorator(`${data.id}`)(
                                                            <RangePicker showTime
                                                                         format="YYYY-MM-DD HH:mm:ss"
                                                                         placeholder={['开始时间','结束时间']}
                                                                         style={{width: '100%'}}/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                : ''
                                )
                            })
                        }
                        {

                            this.props.expand ?
                                <Col span={24} style={{textAlign: 'center'}}>
                                    <Button type="primary" htmlType="submit">搜索</Button>
                                    <Button style={{marginLeft: 8}} onClick={this.handleReset}>清空</Button>
                                </Col>
                                : ''
                        }

                    </Row>
                </Form>
            :''

        )
    }
}

const styleSheet = {
    padding: '0 24px'
};


export default Search = Form.create()(Search);