import React, {Component} from 'react';
import {Table} from 'antd';

export default class com extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                current: this.props.current,
                total: this.props.total,
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: (total, range) => `第${range[0]}条-第${range[1]}条 共 ${total} 条`,
                onChange: this.paginationOnChange,
                onShowSizeChange: this.onShowSizeChange
            },
            selectedRowKeys: []
        };
    }

    //生命周期
    componentWillMount() {
    }

    componentDidMount() {
        this.props.getChild(this)
    }

    componentWillReceiveProps(nextProps) {
        let pagination = Object.assign(this.state.pagination, {
            current: nextProps.current,
            total: nextProps.total,
            records: nextProps.records
        });
        this.setState({
            pagination: pagination
        });
    }

    componentWillUnmount() {
    }

    //生命周期

    //===============  ==================start
    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
        this.props.getSelected(selectedRowKeys);
    };
    clearSelect = () => {
        this.setState({
            selectedRowKeys: []
        }, () => {
            this.props.getSelected(this.state.selectedRowKeys);
        });
    };

    //===============  ==================end
    //=============== 分页器函数 ==================start
    paginationOnChange = (page) => {
        this.props.getCurPage(page);
    };
    onShowSizeChange = (current, size) => {
        this.props.getPageSize(size)
    };

    //=============== 分页器函数 ==================end

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Table
                columns={this.props.columns}
                dataSource={this.props.dataSource}
                scroll={{ x : '150%' }}

                pagination={this.state.pagination}
                rowSelection={rowSelection}
                loading={this.props.loading}
                bordered
            />
        )
    }
}
// columns data