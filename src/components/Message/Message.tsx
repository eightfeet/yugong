import Msg from '@eightfeet/message';

const msgBuilder = (color?: string) => new Msg({
  style: {
    main: {
      backgroundColor: color,
      textAlign: 'left'
    },
  },
});

class Message {
  successMsg: Msg;
  defaultMsg: Msg;
  errorMsg: Msg;
  warningMsg: Msg;
  constructor() {
    this.errorMsg = msgBuilder('red');
    this.successMsg = msgBuilder('#52c41a');
    this.defaultMsg = msgBuilder();
    this.warningMsg = msgBuilder('#faad14');
  }

  /**
   * Default
   */
  public default(message: string) {
    this.defaultMsg.create(message);
  }

  /**
   * Success
   */
  public success(message: string) {
    this.successMsg.create(message);
  }

  /**
   * Error
   */
  public error(message: string) {
    this.errorMsg.create(message);
  }

  /**
   * Warning
   */
  public warning(message: string) {
    this.warningMsg.create(message);
  }

  /**
   * Info
   */
  public info(message: string) {
    this.defaultMsg.create(message);
  }
}

export default new Message();
