import React from "react";
import TaskItems from "./TaskItems";
import { connect } from "react-redux";
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1
    };
  }

  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value
    });
  };

  render() {
    const { tasks } = this.props;
    const { filterName, filterStatus } = this.state;
    const items = tasks.map((task, index) => (
      <TaskItems
        key={index}
        index={index}
        task={task}
        onUpdateStatus={this.props.onUpdateStatus}
        onDelete={this.props.onDelete}
        onUpdate={this.props.onUpdate}
      />
    ));
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {/* task items */}
          {items}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(TaskList);
