import React from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false
    };
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    }
  }

  onChange = event => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    if (name === "status") {
      value = value === "true" ? true : false;
    }
    this.setState({
      [name]: value
    });
  };
  handSubmit = event => {
    event.preventDefault();
    this.props.getInfo(this.state);
    this.onClear();
    this.props.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false
    });
  };

  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading d-flex">
          <h3 className="panel-title mr-5">Thêm Công Việc</h3>
          <button
            className="btn btn-danger d-flex justify-content-center"
            onClick={this.props.onCloseForm}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              name="status"
              required="required"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Thêm
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onClear}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
