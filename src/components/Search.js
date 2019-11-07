import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { keywork: "" };
  }

  onChange = event => {
    this.setState({ keywork: event.target.value });
  };

  onSearch = () => {
    this.props.onSearch(this.state.keywork);
  };

  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập từ khóa..."
            name="keywork"
            onChange={this.onChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.onSearch}
            >
              <span className="fa fa-search mr-5"></span>Tìm
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
