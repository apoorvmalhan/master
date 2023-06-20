// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, message } from 'antd';
import React, { Component } from 'react'
import "antd/dist/antd.css";
import { SAVE_BOOK_INFO, UPDATE_BOOK_INFO, SUB_CATEGORY_LIST, EDIT_BOOK_INFO, CATEGORY_LIST } from '../utils/constants';
import Axios from 'axios';
const { TextArea } = Input;
const success = () => {
    message.success('Submit Successfully', 3);
  };

class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            subCategories: [],
            initialValues: {
                name: null,
                overview: null,
                author: [""],
                review: [""],
                Award: [""]
            },
            formMode: "add_mode"
        };
        this.FormRef = React.createRef();
        this.handleChangeSub = this.handleChangeSub.bind(this);
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        if (typeof id != 'undefined') {
            this.setState({
                formMode: 'edit_mode'
            }, () => {
                this.getInfo(id);
            });
        } else {
            this.setState({
                formMode: 'add_mode'
            });
        };

        this.handleCategory();

    };

    getInfo(id) {
        let Url1 = EDIT_BOOK_INFO + id;
        Axios.get(Url1).then((res) => {
            console.log(res.data)
            let author = res.data.author_info;
            let arrtest = [];
            for (let i = 0; i < author.length; i++) {
                arrtest.push(author[i].name)
            };
            let review = res.data.review_info
            let reviewInfo = [];
            for (let i = 0; i < review.length; i++) {
                reviewInfo.push({
                    reviews: review[i].review,
                    review_by: review[i].review_by
                });
            };

            let awards = res.data.award_info
            let awardInfo = [];
            for (let i = 0; i < awards.length; i++) {
                awardInfo.push({
                    award: awards[i].name,
                    awarded_by: awards[i].awarded_by
                });
            };

            this.handleChangeSub(res.data.category_id);
            this.FormRef.current.setFieldsValue({
                name: res.data.name,
                category: res.data.category_id,
                subcategory: res.data.sub_category_id,
                overview: res.data.overview,
                author: arrtest,
                review: reviewInfo,
                Award: awardInfo
            });
        });
    };


    handleCategory = async ()=> {
        let Url2 = CATEGORY_LIST;
        // Axios.get(Url2).then((res) => {
        //     console.log(res, "res");
        //     this.setState({
        //         categories: res.data
        //     })
        // });
        try {
            const response = await Axios.get(Url2)
           return (console.log(response),
           this.setState({
            categories:response.data
           })
           )
          } catch (err) {
            console.log(err)
          }
    };

    handleChangeSub = async (id) =>{
        let Url = SUB_CATEGORY_LIST + id;
        // Axios.get(Url).then((res) => {
        //     console.log(res, "subcategories response");
        //     this.setState({
        //         subCategories: res.data
        //     })
        // });
        try {
            const response = await Axios.get(Url)
           return (console.log(response),
           this.setState({
            subCategories:response.data
           })
           );
          } catch (err) {
            console.log(err)
          };
    };

    handleSubmit = (values) => {
        const { formMode } = this.state
        let Url = (formMode === 'edit_mode') ? UPDATE_BOOK_INFO : SAVE_BOOK_INFO
        let { id } = this.props.match.params
        Axios.post(Url, {
            id: id,
            name: values.name,
            category: values.category,
            subcategory: values.subcategory,
            overview: values.overview,
            author: values.author,
            review: values.review,
            Award: values.Award,
        })

            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    };



    render() {
        const { initialValues } = this.state;
        const {options} =this.state;
    
        return (
            <div style={{ width: "1200px" }}>
                {/* <Component2 /> */}
                <Form ref={this.FormRef} name="dynamic_form_item" onFinish={this.handleSubmit} initialValues={initialValues} style={{ marginLeft: "280px", marginTop: "10px" }}>
                    <h2 style={{ marginLeft: "350px" }}>Book Form</h2>
                    <div className="row">
                        <div className="col-sm-6">

                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Add Book Form</h5>
                                </div>
                                <div className="card-body">
                                    <Form.Item >
                                        <header>Name</header>
                                        <Space>

                                            <Form.Item
                                                name="name"

                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Name is required',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    style={{
                                                        width: 320,
                                                    }}

                                                    placeholder="Enter Name"
                                                />
                                            </Form.Item>
                                        </Space>
                                    </Form.Item>
                                    <Form.Item >
                                        <header>Category</header>
                                        <Space>

                                            <Form.Item
                                                name="category"
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Category is required',
                                                    },
                                                ]}
                                            >
                                                <Select id="category" name="category" onChange={this.handleChangeSub} placeholder="Please select a category" style={{
                                                    width: 320,
                                                }}>
                                                    {this.state.categories.map((item, index) => <Select.Option key={index} value={item.id}>{item.name}</Select.Option>)}
                                                </Select>
                                            </Form.Item>
                                        </Space>
                                    </Form.Item>
                                    <Form.Item >
                                        <header>Sub Category</header>
                                        <Space>

                                            <Form.Item
                                                name="subcategory"
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Sub Category is required',
                                                    },
                                                ]}
                                            >
                                                <Select name="subcategory" id="subcategory" placeholder="Please select a subcategory" style={{
                                                    width: 320,
                                                }}>
                                                    {this.state.subCategories.map((item, index) => <Select.Option key={index} value={item.id}>{item.name}</Select.Option>)}
                                                </Select>
                                            </Form.Item>
                                        </Space>
                                    </Form.Item>
                                    <Form.Item >
                                        <header>Overview</header>
                                        <Space>
                                            <Form.Item
                                                name="overview"
                                                noStyle
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Overview is required',
                                                    },
                                                ]}
                                            >
                                                <TextArea
                                                    style={{
                                                        width: 320,
                                                    }}
                                                    rows={4} placeholder={this.state.overview}

                                                />
                                            </Form.Item>
                                            {/* <Tooltip title="Useful information">
                                                <Typography.Link href="#API">Need Help?</Typography.Link>
                                            </Tooltip> */}
                                        </Space>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Add Authors</h5>
                                </div>
                                <div className="card-body">
                                    <Form.List
                                        name="author"
                                        id="author"
                                        rules={[
                                            {
                                                validator: async (_, author) => {
                                                    if (!author || author.length < 1) {
                                                        return Promise.reject(new Error('Field Required'));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        {(fields1, { add, remove }, { errors }) => (
                                            <>
                                                {fields1.map((field1, index) => (
                                                    <Form.Item
                                                        required={false}
                                                        key={field1.key}
                                                        style={{ border: "1px solid black" }}

                                                    >
                                                        <header style={{ marginLeft: "10px", marginTop: "10px" }}>Authors:</header>

                                                        <Form.Item id={field1} label="Username" hidden={true}>
                                                                <Input  type="text" />
                                                            </Form.Item>
                                                        <Form.Item
                                                            {...field1}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    whitespace: true,
                                                                    message: "Please input author's name.",
                                                                },
                                                            ]}
                                                            style={{ marginTop: "10px", marginLeft: "10px", }}

                                                        >
                                                            <Input
                                                                placeholder="Author name"
                                                                style={{
                                                                    width: "80%",
                                                                }}
                                                            />
                                                        </Form.Item>
                                                      
                                                        {fields1.length > 1 ? (
                                                            <Button
                                                                type="danger"
                                                                onClick={() => remove(field1.name)}
                                                                style={{ marginLeft: "10px", marginBottom: "10px" }}
                                                            >Remove</Button>
                                                        ) : null}
                                                    </Form.Item>
                                                ))}
                                                <Form.Item>

                                                    <Button

                                                        type='primary'
                                                        onClick={() => add()}
                                                    // style={{
                                                    //     width: '60%',
                                                    // }}

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

                        <div className="col-sm-6" style={{ marginLeft: "-1px", marginTop: "20px" }}>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Add Reviews</h5>
                                </div>
                                <div className="card-body">

                                    <Form.List name="review">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, index, name, ...reviewField }) => (
                                                    // {index,...reviewField},
                                                    <Space
                                                        key={key}
                                                        style={{
                                                            display: 'block',
                                                            marginBottom: 8,
                                                            border: "1px solid black"
                                                        }}
                                                        align="baseline"

                                                    >
                                                        <header style={{ marginLeft: "10px", marginTop: "10px" }}>Review:</header>
                                                        <Form.Item
                                                            {...reviewField}
                                                            name={[name, 'reviews']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing Review',
                                                                },
                                                            ]}
                                                            style={{ marginLeft: "10px", width: "80%" }}
                                                        >

                                                            <TextArea
                                                                style={{
                                                                    width: 320,
                                                                }}
                                                                rows={2} placeholder="Review" />
                                                        </Form.Item>
                                                        <header style={{ marginLeft: "10px", marginTop: "10px" }}>Review By:</header>
                                                        <Form.Item
                                                            {...reviewField}
                                                            name={[name, 'review_by']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing Review By name',
                                                                },
                                                            ]}
                                                            style={{ marginLeft: "10px", width: "80%" }}
                                                        >
                                                            <Input placeholder="Review By"

                                                            />
                                                        </Form.Item>

                                                        <Form.Item>
                                                            {fields.length > 1 ? (
                                                                <Button
                                                                    type="danger" onClick={() => remove(name)}
                                                                    style={{ marginLeft: "10px" }}
                                                                > Remove</Button>) : null}
                                                        </Form.Item>

                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button type="primary" onClick={() => add()} >
                                                        Add Review
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6" style={{ marginTop: "20px" }}>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">Add Awards</h5>
                                </div>
                                <div className="card-body">

                                    <Form.List name="Award">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...awardField }) => (
                                                    <Space
                                                        key={key}
                                                        style={{
                                                            display: 'block',
                                                            marginBottom: 8,
                                                            border: "1px solid black"
                                                        }}
                                                        align="bottom"
                                                    >
                                                        <header style={{ marginLeft: "10px", marginTop: "10px" }}>Award:</header>
                                                        <Form.Item
                                                            {...awardField}
                                                            name={[name, 'award']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing award name',
                                                                },
                                                            ]}
                                                            style={{ marginLeft: "10px", width: "80%" }}
                                                        >
                                                            <Input placeholder="Award" />
                                                        </Form.Item>
                                                        <header style={{ marginLeft: "10px", marginTop: "10px" }}>Awarded By:</header>
                                                        <Form.Item
                                                            {...awardField}
                                                            name={[name, 'awarded_by']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing awarded by name',
                                                                },
                                                            ]}
                                                            style={{ marginLeft: "10px", width: "80%" }}
                                                        >
                                                            <Input placeholder="Awarded By" />
                                                        </Form.Item>

                                                        <Form.Item>
                                                            {fields.length > 1 ? (
                                                                <Button
                                                                    type="danger" onClick={() => remove(name)}
                                                                    style={{ marginLeft: "10px" }}
                                                                > Remove</Button>) : null}
                                                        </Form.Item>
                                                    </Space>
                                                ))}
                                                <Form.Item>

                                                    <Button type="primary" onClick={() => add()} >
                                                        Add Award
                                                    </Button>
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
                            <Button type="primary" onClick={success} htmlType="submit">
                                Submit
                            </Button>
                            {/* <Button type="primary" htmlType="button" style={{marginLeft:"20px"}}>
                                Update
                            </Button> */}
                        </Form.Item>
                    </div>
                </Form>
            </div>
        );
    };

};
export default BookForm