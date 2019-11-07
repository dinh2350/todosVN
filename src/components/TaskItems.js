import React from "react";

class TaskItems extends React.Component {
  onUpdateStatus = () => {
    return this.props.onUpdateStatus(this.props.task.id);
  };
  onDelete = () => {
    return this.props.onDelete(this.props.task.id);
  };
  onUpdate = () => {
    return this.props.onUpdate(this.props.task.id);
  };
  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.task.name}</td>
        <td className="text-center">
          <span
            className={this.props.task.status ? "bg-success" : "bg-danger"}
            onClick={this.onUpdateStatus}
          >
            {this.props.task.status ? "kích hoạt" : "ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this.onUpdate}
          >
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.onDelete}
          >
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItems;
