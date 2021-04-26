import { Snackbar } from "@material-ui/core";
import ReactDOM from "react-dom";

class Message {
  MessageNode: HTMLDivElement;
  constructor() {
    this.MessageNode = document.createElement("div");
    document.body.appendChild(this.MessageNode);
  }

  /**
   * create
   */
  public create(message?: string) {
    ReactDOM.render(
        <Snackbar
            open
            autoHideDuration={6000}
            message={message}
        />,
      this.MessageNode
    );
  }
}

export default new Message();
