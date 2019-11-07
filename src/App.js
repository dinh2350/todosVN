import React from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
let randomstring = require("randomstring");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: "",
        status: -1
      },
      keywork: ""
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks
      });
    }
  }

  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  };

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });
  };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };

  getInfo = data => {
    let { tasks } = this.state;
    if (data.id === "") {
      data.id = randomstring.generate();
      tasks.push(data);
    } else {
      const index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdateStatus = id => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  findIndex = id => {
    const { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  onDelete = id => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    this.onCloseForm();
  };

  onUpdate = id => {
    console.log(id);
    const { tasks } = this.state;
    const index = this.findIndex(id);
    const taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus
      }
    });
  };

  onSearch = keywork => {
    this.setState({
      keywork: keywork
    });
  };

  render() {
    let { tasks, isDisplayForm, taskEditing, filter, keywork } = this.state;
    if (filter.name) {
      tasks = tasks.filter(task => {
        return (
          task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
        );
      });
    }
    if (filter.status !== -1) {
      if (filter.status === 0) {
        tasks = tasks.filter(task => {
          const status = task.status ? 1 : 0;
          return status === 0;
        });
      }
      if (filter.status === 1) {
        tasks = tasks.filter(task => {
          const status = task.status ? 1 : 0;
          return status === 1;
        });
      }
    }

    if (keywork) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keywork.toLowerCase()) !== -1;
      });
    }

    const elmTaskForm = isDisplayForm ? (
      <TaskForm
        getInfo={this.getInfo}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {/* form add */}
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            {/* control */}
            <Control onSearch={this.onSearch} />
            <div className="row mt-4">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/* task list */}
                <TaskList
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  tasks={tasks}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
