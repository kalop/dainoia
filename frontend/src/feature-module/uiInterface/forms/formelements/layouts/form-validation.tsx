import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../../../../router/all_routes";

const FormValidation = () => {
  const routes = all_routes;
  useEffect(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation') as NodeListOf<HTMLFormElement>;
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  }, []);
  return (
    <div>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/*Page Header */}
          <div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title">Form Validation</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item"><Link to={routes.dashboard}>Dashboard</Link></li>
									<li className="breadcrumb-item active">Form Validation</li>
								</ul>
							</div>
						</div>
					</div>
          {/* /Page Header */}

          {/*Row */}
          <div className="row">
            <div className="col-sm-12">
              {/* Custom Boostrap Validation */}
              <div className="card">
                <div className="card-header card-buttons">
                  <h5 className="card-title">
                    Custom Bootstrap Form Validation
                  </h5>
                  <p className="card-text">
                    For custom Bootstrap form validation messages, you’ll need
                    to add the <code>novalidate</code> boolean attribute to
                    your form. For server side validation{" "}
                    <Link
                      to="https://getbootstrap.com/docs/4.1/components/forms/#server-side"
                      target="_blank"
                    >
                      read full documentation
                    </Link>
                    .
                  </p>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm">
                      <form className="needs-validation" noValidate>
                        <div className="form-row row">
                          <div className="col-md-4 mb-3">
                            <label  className="form-label" htmlFor="validationCustom01">
                              First namesss
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              placeholder="First name"
                              defaultValue="Mark"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label" htmlFor="validationCustom02">
                              Last name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom02"
                              placeholder="Last name"
                              defaultValue="Otto"
                              required
                            />
                            <div className="valid-feedback">Looks good!</div>
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label" htmlFor="validationCustomUsername">
                              Username
                            </label>
                            <div className="input-group">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend"
                              >
                                {" "}
                                @{" "}
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustomUsername"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                              />
                              <div className="invalid-feedback">
                                {" "}
                                Please choose a username.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-row row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="validationCustom03">City</label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom03"
                              placeholder="City"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a valid city.
                            </div>
                          </div>
                          <div className="col-md-3 mb-3">
                            <label  className="form-label" htmlFor="validationCustom04">State</label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom04"
                              placeholder="State"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a valid state.
                            </div>
                          </div>
                          <div className="col-md-3 mb-3">
                            <label className="form-label" htmlFor="validationCustom05">Zip</label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationCustom05"
                              placeholder="Zip"
                              required
                            />
                            <div className="invalid-feedback">
                              Please provide a valid zip.
                            </div>
                          </div>
                        </div>
                        <div className="input-block mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="invalidCheck"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="invalidCheck"
                            >
                              Agree to terms and conditions
                            </label>
                            <div className="invalid-feedback">
                              You must agree before submitting.
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Submit form
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Custom Boostrap Validation */}
              {/* Default Browser Validation */}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Browser defaults</h5>
                  <p className="card-text">
                    Not interested in custom validation feedback messages or
                    writing JavaScript to change form behaviors? All good, you
                    can use the browser defaults. Try submitting the form
                    below.
                  </p>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm">
                      <form>
                        <div className="form-row row">
                          <div className="col-md-4 mb-3">
                            <label className="form-label" htmlFor="validationDefault01">
                              First name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationDefault01"
                              placeholder="First name"
                              defaultValue="Mark"
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label" htmlFor="validationDefault02">
                              Last name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationDefault02"
                              placeholder="Last name"
                              defaultValue="Otto"
                              required
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label" htmlFor="validationDefaultUsername">
                              Username
                            </label>
                            <div className="input-group">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend2"
                              >
                                @
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                id="validationDefaultUsername"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend2"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-row row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label" htmlFor="validationDefault03">City</label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationDefault03"
                              placeholder="City"
                              required
                            />
                          </div>
                          <div className="col-md-3 mb-3">
                            <label className="form-label" htmlFor="validationDefault04">State</label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationDefault04"
                              placeholder="State"
                              required
                            />
                          </div>
                          <div className="col-md-3 mb-3">
                            <label className="form-label" htmlFor="validationDefault05">Zip</label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationDefault05"
                              placeholder="Zip"
                              required
                            />
                          </div>
                        </div>
                        <div className="input-block mb-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="invalidCheck2"
                              required
                            />
                            <label
                              className="form-check-label"
                              htmlFor="invalidCheck2"
                            >
                              Agree to terms and conditions
                            </label>
                          </div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Submit form
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Default Browser Validation */}
              {/* Server Side Validation */}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Server side</h5>
                  <p className="card-text">
                    We recommend using client side validation, but in case you
                    require server side, you can indicate invalid and valid
                    form fields with <code>.is-invalid</code> and{" "}
                    <code>.is-valid</code>. Note that{" "}
                    <code>.invalid-feedback</code> is also supported with
                    these classes.
                  </p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-row row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationServer01">First name</label>
                        <input
                          type="text"
                          className="form-control is-valid"
                          id="validationServer01"
                          placeholder="First name"
                          defaultValue="Mark"
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationServer02">Last name</label>
                        <input
                          type="text"
                          className="form-control is-valid"
                          id="validationServer02"
                          placeholder="Last name"
                          defaultValue="Otto"
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationServerUsername">
                          Username
                        </label>
                        <div className="input-group">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend3"
                          >
                            @
                          </span>
                          <input
                            type="text"
                            className="form-control is-invalid"
                            id="validationServerUsername"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend3"
                            required
                          />
                          <div className="invalid-feedback">
                            Please choose a username.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-row row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label" htmlFor="validationServer03">City</label>
                        <input
                          type="text"
                          className="form-control is-invalid"
                          id="validationServer03"
                          placeholder="City"
                          required
                        />
                        <div className="invalid-feedback">
                          Please provide a valid city.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label" htmlFor="validationServer04">State</label>
                        <input
                          type="text"
                          className="form-control is-invalid"
                          id="validationServer04"
                          placeholder="State"
                          required
                        />
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label" htmlFor="validationServer05">Zip</label>
                        <input
                          type="text"
                          className="form-control is-invalid"
                          id="validationServer05"
                          placeholder="Zip"
                          required
                        />
                        <div className="invalid-feedback">
                          Please provide a valid zip.
                        </div>
                      </div>
                    </div>
                    <div className="input-block mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input is-invalid"
                          type="checkbox"
                          id="invalidCheck3"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck3"
                        >
                          Agree to terms and conditions
                        </label>
                        <div className="invalid-feedback">
                          You must agree before submitting.
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      {" "}
                      Submit form
                    </button>
                  </form>
                </div>
              </div>
              {/* /Server Side Validation */}
              {/* Supported Elements */}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Supported elements</h5>
                  <p className="card-text">
                    Form validation styles are also available for bootstrap
                    custom form controls.
                  </p>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm">
                      <form className="was-validated">
                        <div className="mb-3">
                          <label 
                            htmlFor="validationTextarea"
                            className="form-label"
                          >
                            Textarea
                          </label>
                          <textarea
                            className="form-control is-invalid"
                            id="validationTextarea"
                            placeholder="Required example textarea"
                            required
                            defaultValue={""}
                          />
                          <div className="invalid-feedback">
                            Please enter a message in the textarea.
                          </div>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="validationFormCheck1"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="validationFormCheck1"
                          >
                            Check this checkbox{" "}
                          </label>
                          <div className="invalid-feedback">
                            Example invalid feedback text
                          </div>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="validationFormCheck2"
                            name="radio-stacked"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="validationFormCheck2"
                          >
                            Toggle this radio
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="validationFormCheck3"
                            name="radio-stacked"
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="validationFormCheck3"
                          >
                            Or toggle this other radio
                          </label>
                          <div className="invalid-feedback">
                            {" "}
                            More example invalid feedback text
                          </div>
                        </div>
                        <div className="mb-3">
                          <select
                            className="form-select"
                            required
                            aria-label="select example"
                          >
                            <option>Open this select menu</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                          </select>
                          <div className="invalid-feedback">
                            Example invalid select feedback
                          </div>
                        </div>
                        <div className="mb-3">
                          <input
                            type="file"
                            className="form-control"
                            aria-label="file example"
                            required
                          />
                          <div className="invalid-feedback">
                            Example invalid form file feedback
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Supported Elements */}
              {/* Validation Tooltips */}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Tooltips</h5>
                  <p className="card-text">
                    You can swap the{" "}
                    <code>
                      .{"{"}valid|invalid{"}"}-feedback
                    </code>{" "}
                    classes for{" "}
                    <code>
                      .{"{"}valid|invalid{"}"}-tooltip
                    </code>{" "}
                    classes to display validation feedback in a styled
                    tooltip.
                  </p>
                </div>
                <div className="card-body">
                  <form className="needs-validation" noValidate>
                    <div className="form-row row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationTooltip01">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationTooltip01"
                          placeholder="First name"
                          defaultValue="Mark"
                          required
                        />
                        <div className="valid-tooltip">Looks good!</div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationTooltip02">Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationTooltip02"
                          placeholder="Last name"
                          defaultValue="Otto"
                          required
                        />
                        <div className="valid-tooltip">Looks good!</div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label" htmlFor="validationTooltipUsername">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationTooltipUsername"
                          placeholder="Username"
                          required
                        />
                        <div className="invalid-tooltip">
                          Please choose a unique and valid username.
                        </div>
                      </div>
                    </div>
                    <div className="form-row row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label"  htmlFor="validationTooltip03">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationTooltip03"
                          placeholder="City"
                          required
                        />
                        <div className="invalid-tooltip">
                          Please provide a valid city.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label" htmlFor="validationTooltip04">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationTooltip04"
                          placeholder="State"
                          required
                        />
                        <div className="invalid-tooltip">
                          Please provide a valid state.
                        </div>
                      </div>
                      <div className="col-md-3 mb-3">
                        <label className="form-label" htmlFor="validationTooltip05">Zip</label>
                        <input
                          type="text"
                          className="form-control"
                          id="validationTooltip05"
                          placeholder="Zip"
                          required
                        />
                        <div className="invalid-tooltip">
                          Please provide a valid zip.
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Submit form{" "}
                    </button>
                  </form>
                </div>
              </div>
              {/* /Validation Tooltips */}
            </div>
          </div>
          {/* /Row */}
        </div>
      </div>
    </div>
  );
};

export default FormValidation;
