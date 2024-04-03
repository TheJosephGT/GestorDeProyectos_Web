import React from "react";

function Dashboard() {
  return (
    <>
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="align-items-center">
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>Proyectos registrados</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer">
                    Mas info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>53</h3>
                    <p>Tareas registradas</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">
                    Mas info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>Usuarios registrados</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">
                    Mas info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>53</h3>
                    <p>Tareas pendientes</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">
                    Mas info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Projects</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Projects</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="remove"
                title="Remove"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>#</th>
                  <th style={{ width: "20%" }}>Project Name</th>
                  <th style={{ width: "30%" }}>Fecha</th>
                  <th>Project Progress</th>
                  <th style={{ width: "8%" }} className="text-center">
                    Status
                  </th>
                  <th style={{ width: "20%" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#</td>
                  <td>
                    <a style={{ fontSize: 18 }}>Nombre Proyecto</a>
                  </td>
                  <td>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a style={{ fontSize: 18 }}>Created 01.01.2019</a>
                      </li>
                    </ul>
                  </td>
                  <td className="project_progress">
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-green"
                        role="progressbar"
                        aria-valuenow={57}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "57%" }}
                      ></div>
                    </div>
                    <small>57% Complete</small>
                  </td>
                  <td className="project-state">
                    <span className="badge badge-success">Success</span>
                  </td>
                  <td className="project-actions text-right">
                    <a className="btn btn-primary btn-sm" href="#">
                      <i className="fas fa-folder"></i>
                      View
                    </a>
                    <a className="btn btn-info btn-sm" href="#">
                      <i className="fas fa-pencil-alt"></i>
                      Edit
                    </a>
                    <a className="btn btn-danger btn-sm" href="#">
                      <i className="fas fa-trash"></i>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>
                    <a style={{ fontSize: 18 }}>Nombre Proyecto</a>
                  </td>
                  <td>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a style={{ fontSize: 18 }}>Created 01.01.2019</a>
                      </li>
                    </ul>
                  </td>
                  <td className="project_progress">
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-green"
                        role="progressbar"
                        aria-valuenow={57}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "57%" }}
                      ></div>
                    </div>
                    <small>57% Complete</small>
                  </td>
                  <td className="project-state">
                    <span className="badge badge-success">Success</span>
                  </td>
                  <td className="project-actions text-right">
                    <a className="btn btn-primary btn-sm" href="#">
                      <i className="fas fa-folder"></i>
                      View
                    </a>
                    <a className="btn btn-info btn-sm" href="#">
                      <i className="fas fa-pencil-alt"></i>
                      Edit
                    </a>
                    <a className="btn btn-danger btn-sm" href="#">
                      <i className="fas fa-trash"></i>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>
                    <a style={{ fontSize: 18 }}>Nombre Proyecto</a>
                  </td>
                  <td>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a style={{ fontSize: 18 }}>Created 01.01.2019</a>
                      </li>
                    </ul>
                  </td>
                  <td className="project_progress">
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-green"
                        role="progressbar"
                        aria-valuenow={57}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "57%" }}
                      ></div>
                    </div>
                    <small>57% Complete</small>
                  </td>
                  <td className="project-state">
                    <span className="badge badge-success">Success</span>
                  </td>
                  <td className="project-actions text-right">
                    <a className="btn btn-primary btn-sm" href="#">
                      <i className="fas fa-folder"></i>
                      View
                    </a>
                    <a className="btn btn-info btn-sm" href="#">
                      <i className="fas fa-pencil-alt"></i>
                      Edit
                    </a>
                    <a className="btn btn-danger btn-sm" href="#">
                      <i className="fas fa-trash"></i>
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
