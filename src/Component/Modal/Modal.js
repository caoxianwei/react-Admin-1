import React, {Component} from 'react';
import {Checkbox, Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Switch,Cascader} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const RangePicker = DatePicker.RangePicker;
const { TextArea } = Input;

class Modal1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            title: this.props.title || '默认标题',
            defaultValue:{},
            disabled:false
        }
    }

    //生命周期
    componentWillMount() {}

    componentDidMount() {
        this.props.getModal(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({defaultValue: nextProps.defaultValue,disabled:nextProps.disabled});
    }

    componentWillUnmount() {
    }

    //生命周期
    //=============== 组件函数 ==================start
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = () => {
	    this.setState({confirmLoading: true});
        this.props.form.validateFields((err, values) => {
            if(!err){
	            setTimeout(() => {
		            this.setState({
			            visible: false,
			            confirmLoading: false,
		            });
	            }, 2000);
            }
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            defaultValue:{},
            disabled:false
        });
        let com = {
            defaultValue: {},
            disabled: false
        };
        this.props.modalClose(com)
    };

    //=============== 组件函数 ==================end

    render() {
        const {visible, confirmLoading, title} = this.state;
        const {getFieldDecorator} = this.props.form;
	    const formItemLayout = {
		    labelCol: { span: 6 },
		    wrapperCol: { span: 8 },
	    };
        return (
            <Modal
                title={title}
                visible={visible}
                maskClosable={false}
                confirmLoading={confirmLoading}
                width={1024}
                okText={'确认'}
                destroyOnClose={true}
                cancelText={'取消'}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form onSubmit={this.handleOk}>
                    {
                        this.props.modalContent && this.props.modalContent.map((data, index) => {
                            return (
                                data.type === 'input' || data.type === 'password' ?
                                    <Row gutter={24} key={index}>
                                        <Col span={12} offset={6}>
                                            <FormItem {...formItemLayout} label={`${data.name}`}>
                                                {getFieldDecorator(`${data.id}`, {
                                                    rules: [
                                                        {required: data.rules && data.rules.required, message: '此为必填项'},//data.rules.required | false
                                                        {required: data.rules && data.rules.number, message: '必须为数字'},
                                                    ],
                                                    initialValue: this.state.defaultValue[data.id] || ''
                                                })(
                                                    <Input type={data.type} disabled={this.state.disabled}/>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    : data.type === 'textarea' ?
                                    <Row gutter={24} key={index}>
                                        <Col span={12} offset={6}>
                                            <FormItem {...formItemLayout} label={`${data.name}`}>
                                                {getFieldDecorator(`${data.id}`, {
                                                    rules: [
                                                        {required: data.rules && data.rules.required, message: '此为必填项'},//data.rules.required | false
                                                        {required: data.rules && data.rules.number, message: '必须为数字'},
                                                    ],
                                                    initialValue:this.state.defaultValue[data.id] || ''
                                                })(
                                                    <TextArea rows={4} disabled={this.state.disabled}/>
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    : data.type === 'select' ?
                                        <Row gutter={24} key={index}>
                                            <Col span={12} offset={6}>
                                                <FormItem {...formItemLayout} label={`${data.name}`}>
                                                    {getFieldDecorator(`${data.id}`, {
                                                        rules: [{required: data.isRequired, message: '此为必填项'}],
                                                        initialValue: this.state.defaultValue[data.id] && this.state.defaultValue[data.id]
                                                    })(
                                                        <Select disabled={this.state.disabled} mode={data.isMultiple === true ? 'multiple' : ''}>
                                                            {
                                                                data.option && data.option.map((result, index2) => {
                                                                    return (
                                                                        <Option key={result.id + index2}
                                                                                value={result.value}>{result.label}</Option>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        : data.type === 'timePicker' ?
                                            <Row gutter={24} key={index}>
                                                <Col span={12} offset={6}>
                                                    <FormItem {...formItemLayout} label={`${data.name}`}>
                                                        {getFieldDecorator(`${data.id}`, {
                                                            rules: [{required: data.isRequired, message: '此为必填项'}],
                                                            initialValue:this.state.defaultValue[data.id] && moment(this.state.defaultValue[data.id],"YYYY-MM-DD HH:mm:ss") || ''
                                                        })(
                                                            <DatePicker showTime
                                                                        disabled={this.state.disabled}
                                                                        placeholder={'选择时间'}
                                                                        format="YYYY-MM-DD HH:mm:ss"
                                                                        style={{width: '100%'}}/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                            : data.type === 'timeRange' ?
                                                <Row gutter={24} key={index}>
                                                    <Col span={12} offset={6}>
                                                        <FormItem {...formItemLayout} label={`${data.name}`}>
                                                            {getFieldDecorator(`${data.id}`, {
                                                                rules: [{required: data.isRequired, message: '此为必填项'}],
                                                                // initialValue:this.state.defaultValue[data.id] || ''
                                                            })(
                                                                <RangePicker showTime
                                                                             disabled={this.state.disabled}
                                                                             placeholder={['开始时间', '结束时间']}
                                                                             format="YYYY-MM-DD HH:mm:ss"
                                                                             style={{width: '100%'}}/>
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                                : data.type === 'switch' ?
                                                    <Row gutter={24} key={index}>
                                                        <Col span={12} offset={6}>
                                                            <FormItem {...formItemLayout} label={`${data.name}`}>
                                                                {getFieldDecorator(`${data.id}`, {
                                                                    rules: [{
                                                                        required: data.isRequired,
                                                                        message: '此为必填项'
                                                                    }],
                                                                })(
                                                                    <Switch
                                                                        disabled={this.state.disabled}
                                                                        checked={this.state.defaultValue[data.id] === 1}
                                                                        checkedChildren={data.option && data.option[0]}
                                                                        unCheckedChildren={data.option && data.option[1]}
                                                                    />
                                                                )}
                                                            </FormItem>
                                                        </Col>
                                                    </Row>
                                                    : data.type === 'radio' ?
                                                        <Row gutter={24} key={index}>
                                                            <Col span={12} offset={6}>
                                                                <FormItem {...formItemLayout} label={`${data.name}`}>
                                                                    {getFieldDecorator(`${data.id}`, {
                                                                        rules: [{
                                                                            required: data.isRequired,
                                                                            message: '此为必填项'
                                                                        }],
                                                                        initialValue: this.state.defaultValue[data.id] + '' || ''
                                                                    })(
                                                                        <RadioGroup>
                                                                            {
                                                                                data.option && data.option.map((result, radioIndex) => {
                                                                                    return (
                                                                                        <Radio key={radioIndex}
                                                                                               disabled={this.state.disabled}
                                                                                               value={result.value}>{result.label}</Radio>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </RadioGroup>
                                                                    )}
                                                                </FormItem>
                                                            </Col>
                                                        </Row>
                                                        : data.type === 'checkbox' ?
                                                            <Row gutter={24} key={index}>
                                                                <Col span={12} offset={6}>
                                                                    <FormItem {...formItemLayout}
                                                                              label={`${data.name}`}>
                                                                        {getFieldDecorator(`${data.id}`, {
                                                                            rules: [{
                                                                                required: data.isRequired,
                                                                                message: '此为必填项'
                                                                            }],
                                                                            initialValue: this.state.defaultValue[data.id] && this.state.defaultValue[data.id]
                                                                        })(
                                                                            <CheckboxGroup>
                                                                                {
                                                                                    data.option && data.option.map((result, CheckboxIndex) => {
                                                                                        return (
                                                                                            <Checkbox
                                                                                                key={CheckboxIndex}
                                                                                                disabled={this.state.disabled}
                                                                                                value={result.value}>{result.label}</Checkbox>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </CheckboxGroup>
                                                                        )}
                                                                    </FormItem>
                                                                </Col>
                                                            </Row>
                                                            : data.type === 'cascader' ?
                                                                <Row gutter={24} key={index}>
                                                                    <Col span={12} offset={6}>
                                                                        <FormItem {...formItemLayout}
                                                                                  label={`${data.name}`}>
                                                                            {getFieldDecorator(`${data.id}`, {
                                                                                rules: [{
                                                                                    required: data.isRequired,
                                                                                    message: '此为必填项'
                                                                                }],
                                                                                initialValue: this.state.defaultValue[data.id] || ''
                                                                            })(
                                                                                <Cascader
                                                                                    options={data.option}
                                                                                    disabled={this.state.disabled}
                                                                                    placeholder={'级联选择'}
                                                                                    showSearch
                                                                                />
                                                                            )}
                                                                        </FormItem>
                                                                    </Col>
                                                                </Row>
                                                                : ''
                            );
                        })
                    }
                </Form>
            </Modal>
        )
    }
}

export default Modal1 = Form.create()(Modal1);