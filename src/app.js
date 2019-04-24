import React, { Component } from "react";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyItems: ["milk", "bread", "fruit"],
      message: ""
    };

    this.textInput = React.createRef();
  }

  addItem(event) {
    event.preventDefault();

    const { buyItems } = this.state;
    const newItem = this.textInput.current.value;
    const isOnTheList = buyItems.includes(newItem);

    if (isOnTheList) {
      this.setState({
        message: "This item is on the list"
      });
    } else {
      newItem !== "" &&
        this.setState({
          // buyItems: buyItems.concat(newItem)
          buyItems: [...buyItems, newItem],
          message: ""
        });
      // this.textInput.current.value = "";
      this.addForm.reset();
    }
  }

  removeItem(item) {
    const newBuyItems = this.state.buyItems.filter(buyItem => {
      return buyItem !== item;
    });

    this.setState({
      buyItems: [...newBuyItems]
    });

    if (newBuyItems.length === 0) {
      this.setState({
        message: "No items on your list, add some."
      });
    }
  }

  clearAll(event) {
    const target = event.target;
    this.setState({
      buyItems: [],
      message: "No items on your list, add some."
    });
  }

  render() {
    const { buyItems, message } = this.state;
    return (
      <div className="container">
        <header>
          <div>
            {" "}
            <i className="fas fa-apple-alt fa-3x" />
            <i className="fas fa-apple-alt fa-6x" />
            <i className="fas fa-apple-alt fa-9x" />
            <i className="fas fa-apple-alt fa-6x" />
            <i className="fas fa-apple-alt fa-3x" />
          </div>
          <h1 className="pulse">Shopping list</h1>
          <form
            ref={input => {
              this.addForm = input;
            }}
            className="form-inline"
            onSubmit={event => {
              this.addItem(event);
            }}
          >
            <div className="form-group">
              <label className="sr-only" htmlFor="newItemInput">
                Add New Item
              </label>
              <input
                type="text"
                placeholder="Bread"
                className="form-control"
                id="newItemInput"
                ref={this.textInput}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </header>
        <div className="content">
          {(message !== "" || buyItems.length === 0) && (
            <p className="message text-danger">
              <strong>{message}</strong>
            </p>
          )}
          {buyItems.length > 0 && (
            <table className="table">
              {/* <caption>Shopping list</caption> */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {buyItems.map((item, index) => {
                  return (
                    <tr key={item}>
                      <th scope="row">{index + 1}</th>
                      <td>{item}</td>
                      <td className="text-right">
                        <button
                          onClick={event => this.removeItem(item)}
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">&nbsp;</td>
                  <td className="text-right">
                    <button
                      onClick={e => this.clearAll(e)}
                      className="btn btn-default btn-sm"
                    >
                      Clear list
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    );
  }
}
