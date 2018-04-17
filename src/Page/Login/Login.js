import React, {PureComponent} from 'react'
import {Button, Checkbox, Col, Form, Icon, Input, Row} from 'antd'
import axios from 'axios'
import getStaticData from '../../utils/getStaticData'
import jwt from 'jsonwebtoken';
import * as localstorageUtils from '../../utils/localStorageUtils'
import api from '../../api/index'
import bg from './bg.jpg'

const FormItem = Form.Item;

class Login extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values['username'] === 'guest' && values['password'] === 'guest') {
					axios.post(api.login, {...values})
					.then(res => {
						if (res.data.is_success === true) {
							localstorageUtils.localItem('JWT',JSON.stringify(res.data.result));
							localstorageUtils.localItem('userInfo', JSON.stringify(jwt.decode(res.data.result.token, {complete: true})));
							this.props.history.push('/homePage');
							getStaticData();
						} else {
							alert(res.data.error_info.msg);
						}
					})
					.catch(err => console.log(err));
				}else {
					alert('sdfasd')
				}
			}
		});
	};
	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<div style={styleSheet.div}>
				<Row>
					<Col style={styleSheet.Col} span={4} offset={6}>
						<h1>SIGN IN</h1>
						<Form onSubmit={this.handleSubmit} className="login-form">
							<FormItem>
								{getFieldDecorator('username', {
									rules: [{required: true, message: '请输入用户名!'}],
									initialValue:'guest'
								})(
									<Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
									       placeholder="Username"/>
								)}
							</FormItem>

							<FormItem>
								{getFieldDecorator('password', {
									rules: [{required: true, message: '请输入密码!'}],
									initialValue:'guest'
								})(
									<Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
									       type="password" placeholder="Password" />
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true,
								})(
									<Checkbox>Remember me</Checkbox>
								)}
								<Button style={styleSheet.button} type="primary" htmlType="submit"
								        className="login-form-button">
									Log in
								</Button>
							</FormItem>
						</Form>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Login = Form.create()(Login);
const styleSheet = {
	div: {
		width: '100%',
		minHeight: '100%',
		position: 'absolute',
		paddingTop: 100,
		backgroundImage: "url(" + bg + ")",
		backgroundColor: '#ffffff',
		backgroundSize: 'cover',
		backgroundPosition: '-30% center',
		backgroundRepeat: 'no-repeat',
	},
	Col: {
		boxShadow: '-4px 7px 46px 2px rgba(0, 0, 0, 0.1)',
		padding: 30
	},
	button: {
		width: '100%'
	}
};