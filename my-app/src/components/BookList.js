import React, { Component } from 'react'
import { Pagination,message, Popconfirm } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"
import { DELETE_BOOK_FORM, LIST_BOOK_INFO} from '../utils/constants';
import Axios from 'axios';


const cancel = (e) => {
  console.log(e);
};

export class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookCount: 0
      
    };
  };

  componentDidMount() {  
    this.getList(1)
  };

  getList(page){
    let Url = LIST_BOOK_INFO+"?page="+ page;
    Axios.get(Url).then((res) => {
      console.log(res, "res");
      this.setState({
        books: res.data.rows,
        bookCount: res.data.count
      });
    });
  };

  handleDelete = (id) => {
    let Url = DELETE_BOOK_FORM + id;
    Axios.get(Url).then((res) => {
      console.log(res, "deleted");
      message.success('Deleted');
      this.setState({
        books: this.state.books.slice(0)
      });  
    });
  };


  render() {
    const {bookCount}= this.state
    return (
      <div style={{marginLeft:"220px"}}>

        <h3 style={{ textAlign: "center" }}>Book List</h3>
        <table className="table table-bordered" >
          <thead>
            <tr>
              <th >Sr.no</th>
              <th >Name</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>No. Of Authors</th>
              <th>No. Of Reviews</th>
              <th>No. Of Awards</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.name}</td>
                <td>{book?.category_info?.name}</td>
                <td>{book?.subcategory_info?.name}</td>
                <td>{book.noOfAuthors}</td>
                <td>{book.noOfReview}</td>
                <td>{book.noOfAwards}</td>
                <td>
                  <Link to={{ 
                    pathname: "/editform/" + book.id,
                  }}> <FormOutlined/></Link>
                  <Popconfirm
                    title="Are you sure to delete this task?"
                    onConfirm={() => this.handleDelete(book.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Link to="" style={{ paddingLeft: "10px" }}><DeleteOutlined /></Link>
                  </Popconfirm>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          total={bookCount}
          onChange={(e)=>{this.getList(e)}}
          defaultCurrent={1}
        />

      </div>
    )
  }
}

export default BookList
