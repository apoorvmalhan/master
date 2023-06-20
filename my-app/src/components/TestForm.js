import React, { Component } from 'react'
import { Button, Form, Input, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

const { TextArea } = Input;


export default class TestForm extends Component {
    state = {
        author: [],
        review: [],
        reviewby: []
    }

    componentDidMount() {

        this.setState({
            author: <Form.Item name="author"
                rules={[
                    {
                        required: true,
                        message: 'enter Author',
                    },
                ]}>
                <header>Add Author</header>
                <Input placeholder='Enter Author Name' />

            </Form.Item>,
            review: <Form.Item name="review"
                // rules={[
                //     {
                //         required: true,
                //         message: 'enter review',
                //     },
                // ]}
                >
                <header>Add Review</header>
                <Input placeholder='Enter Review' />
                <header style={{ marginTop: "10px" }}>Add Review By</header>
                <Input placeholder='Enter Review By' />

            </Form.Item>,
            reviewby: <Form.Item name="review"
               >
                <header>Add Review By</header>
                <Input placeholder='Enter Review' />

            </Form.Item>

        })
    }
   
    render() {
        const onFinish = (values) => {
            console.log('Received values of form:', values);
          };
        return (
            <>
                <h2 style={{ marginLeft: "300px" }}>Book Form</h2>
                <Form name="dynamic_form_nest_item" onFinish={onFinish}>
                    <div className="row">
                        <div className="col-sm-6">

                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Add Book Form</h5>
                                </div>
                                <div className="card-body">
                                    <Form.Item name="name"
                                       rules={[
                                        {
                                          required: false,
                                        //   message: "Please input your Name!",
                                        //   min:3
                                          
                                        }
                                      ]}
                                    
                                      > 
                                        <label htmlFor="name">Name</label>
                                        <Input placeholder='Enter Book Name' />
                                    </Form.Item>
                                    <Form.Item name="category">
                                        <label htmlFor="category">Category</label>
                                        <Select name="category" placeholder="Please select a category">

                                        </Select>
                                    </Form.Item>

                                    <Form.Item name="subcategory">
                                        <label htmlFor="subactegory">SubCategory</label>
                                        <Select name="subcategory" placeholder="Please select a subcategory">
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <h6>Overview</h6>
                                        <TextArea rows={4} placeholder="overview" maxLength={6} />
                                    </Form.Item>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Add Author</h5>
                                </div>
                                <div className="card-body">



                                    <Form.List
                                        name="authors"
                                        // rules={[
                                        //     {
                                        //         validator: async (_, named) => {
                                        //             if (!named || named.length < 1) {
                                        //                 return Promise.reject(new Error('Field Required'));
                                        //             }
                                        //         },
                                        //     },
                                        // ]}
                                    >
                                        {(fields1, { add, remove }, { errors }) => (
                                            <>
                                                {fields1.map((field1, index) => (
                                                    <Form.Item
                                                        label={index === 0 ? "" : ''}
                                                        required={false}
                                                        key={field1.key}
                                                        name={[field1.name, 'name']}
                                                    >
                                                        <Form.Item
                                                            {...field1}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            // rules={[
                                                            //     {
                                                            //         required: true,
                                                            //         whitespace: true,
                                                            //         min: 3,
                                                            //         message: "Please input author's name or delete this field.",
                                                            //     },
                                                            // ]}
                                                            noStyle
                                                        >
                                                            <header>Add Author</header>
                                                            <Input
                                                                key={field1.key}
                                                                placeholder="Author name"
                                                            // style={{
                                                            //     width: '60%',
                                                            // }}
                                                            />
                                                        </Form.Item>
                                                        {fields1 ? (
                                                            <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                onClick={() => remove(field1.name)}
                                                            />
                                                        ) : null}
                                                    </Form.Item>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        className='btn btn-primary'
                                                        onClick={() => add()}

                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add Authors
                                                    </Button>
                                                    <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ marginTop: "30px" }}>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Add Review</h5>
                                </div>
                                <div className="card-body">

                                    <Form.List
                                        name="review"
                                        // rules={[
                                        //     {
                                        //         validator: async (_, review) => {
                                        //             if (!review) {
                                        //                 return Promise.reject(new Error('Field Required'));
                                        //             }
                                        //         },
                                        //     },
                                        // ]}
                                    >
                                        {(fields2, { add, remove }, { errors }) => (
                                            <>

                                                {this.state.review}


                                                {fields2.map((field2, index) => (

                                                    <Form.Item
                                                        // {...(index === 0 ? formItemLayout1 : formItemLayoutWithOutLabel1)}
                                                        label={index === 0 ? "" : ''}
                                                        required={false}
                                                        key={field2.key}
                                                    >
                                                        <Form.Item
                                                            {...field2}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            // rules={[
                                                            //     {
                                                            //         required: true,
                                                            //         whitespace: true,
                                                            //         message: "Please input review and review by or delete this field.",
                                                            //     },
                                                            // ]}
                                                            noStyle
                                                        >
                                                            <header>Add Review</header>
                                                            <Input
                                                                placeholder="Enter Review"
                                                            // style={{
                                                            //     width: '60%',
                                                            // }}
                                                            />
                                                            <header style={{ marginTop: "10px" }}>Add Review By</header>
                                                            <Input
                                                                placeholder="Enter Review By"
                                                            // style={{
                                                            //     width: '60%',
                                                            // }}
                                                            />
                                                        </Form.Item>


                                                        <Form.Item style={{ marginTop: "10px" }}>

                                                            {fields2 ? (
                                                                // <MinusCircleOutlined
                                                                //     className="dynamic-delete-button"
                                                                //     onClick={() => remove(field2.name)}
                                                                // />
                                                                <Button
                                                                    className='btn btn-danger'
                                                                    onClick={() => remove(field2.name)}

                                                                >
                                                                    Remove
                                                                </Button>
                                                            ) : null}
                                                        </Form.Item>

                                                    </Form.Item>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        className='btn btn-primary'
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add Review
                                                    </Button>
                                                    <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Add Award</h5>
                                </div>
                                <div className="card-body">

                                    <Form.List
                                        name="award"
                                        // rules={[
                                        //     {
                                        //         validator: async (_, award) => {
                                        //             if (!award) {
                                        //                 return Promise.reject(new Error('Field Required'));
                                        //             }
                                        //         },
                                        //     },
                                        // ]}
                                    >
                                        {(fields3, { add, remove }, { errors }) => (
                                            <>
                                                <Form.Item name="award">
                                                    <header>Add Award</header>
                                                    <Input placeholder='Enter Review' />

                                                    <header style={{ marginTop: "10px" }}>Add Awarded By</header>
                                                    <Input placeholder='Enter Review By' />

                                                </Form.Item>

                                                {fields3.map((fields3, index) => (

                                                    <Form.Item
                                                        // {...(index === 0 ? formItemLayout1 : formItemLayoutWithOutLabel1)}
                                                        label={index === 0 ? "" : ''}
                                                        required={false}
                                                        key={fields3.key}
                                                    >
                                                        <Form.Item
                                                            {...fields3}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            // rules={[
                                                            //     {
                                                            //         required: true,
                                                            //         whitespace: true,
                                                            //         message: "Please input author's name or delete this field.",
                                                            //     },
                                                            // ]}
                                                            noStyle
                                                        >
                                                            <header>Add Award</header>
                                                            <Input
                                                                placeholder="Enter Review"
                                                            // style={{
                                                            //     width: '60%',
                                                            // }}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...fields3}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            // rules={[
                                                            //     {
                                                            //         required: true,
                                                            //         whitespace: true,
                                                            //         message: "Please input author's name or delete this field.",
                                                            //     },
                                                            // ]}
                                                            style={{ marginTop: "5px" }}
                                                        >
                                                            <header>Add Awarded By</header>
                                                            <Input
                                                                placeholder="Enter Review By"
                                                            // style={{
                                                            //     width: '60%',
                                                            // }}
                                                            />
                                                        </Form.Item>



                                                        {fields3 ? (
                                                            // <MinusCircleOutlined
                                                            //     className="dynamic-delete-button"
                                                            //     onClick={() => remove(field2.name)}
                                                            // />
                                                            <Button
                                                                className='btn btn-danger'
                                                                onClick={() => remove(fields3.name)}

                                                            >
                                                                Remove
                                                            </Button>
                                                        ) : null}
                                                    </Form.Item>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        className='btn btn-primary'
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add Award
                                                    </Button>
                                                    <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='container' style={{ marginLeft: "400px", marginTop: "40px" }}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </>
        )
    }
}
