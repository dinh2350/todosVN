import React from "react";

class Sort extends React.Component {
  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenu1"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li>
              <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
            </li>
            <li>
              <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
            </li>
            <li role="separator" className="divider"></li>
            <li>Trạng Thái Kích Hoạt</li>
            <li>Trạng Thái Ẩn</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
