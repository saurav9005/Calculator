import React from "react";
import "./DisplayToolbar.css";

function isOverflown(element) {
  return element.scrollWidth > element.clientWidth;
}

export default class DisplayToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.onTextareaChanged = this.onTextareaChanged.bind(this);
  }

  onTextareaChanged() {
    var currentfontsize = 5;
    var display = document.getElementById("display");
    if (isOverflown(display)) {
      while (isOverflown(display)) {
        currentfontsize--;
        display.style.fontSize = currentfontsize + "px";
      }
    } else {
      currentfontsize = 5;
      display.style.fontSize = currentfontsize + "px";
      while (isOverflown(display)) {
        currentfontsize--;
        display.style.fontSize = currentfontsize + "px";
      }
    }
  }

  render() {
    return (
      <div className="display-toolbar">
        <form className="display">
          <textarea
            className="display-formula"
            onChange={this.onTextareaChanged}
            value={this.props.uppertext.join("")}
          ></textarea>
          <textarea
            className="display-input"
            id="display"
            rows="1"
            onChange={this.onTextareaChanged}
            value={this.props.input}
            onkeypress={this.onTextareaChanged}
          ></textarea>
        </form>
        <div className="toolbar">
          <div
            className="toolbar-item"
            id="view-history"
            onClick={this.props.onHistory}
          >
            {this.props.isShowHistory ? "Keypad" : "History"}
          </div>
        </div>
      </div>
    );
  }
}
