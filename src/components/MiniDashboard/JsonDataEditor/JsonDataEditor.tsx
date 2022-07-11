import { Component } from 'react'
import { Button, message, Modal, ModalProps } from 'antd';
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";

import { CopyOutlined } from '@ant-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';


type Props = {
  data?: { [keys: string]: any };
  onConfirm?: (data: any) => void;
}

type State = {
  newData?: any;
  disabled?: boolean;
}

export default class JsonDataEditor extends Component<Props & ModalProps, State> {
  [x: string]: any;
  jsoneditor?: JSONEditor;
  constructor(props: (Props & ModalProps) | Readonly<Props & ModalProps>) {
    super(props)
    this.state = {
      newData: props.data,
      disabled: false,
    }
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) { 
    if(this.props.visible && !this.jsoneditor){
      const options: any = {
        mode: 'code',
        mainMenuBar: false,
        onChange: () => this.setState({newData: this.jsoneditor?.get()})
      };
      this.jsoneditor = new JSONEditor(this.container, options);
      this.jsoneditor.set(this.props.data);
      this.setState({newData: this.props.data})
    }
    
  } 

  handleOk = () => {
    try {
      const data = this.jsoneditor?.get();
      const { onConfirm } = this.props;
      if (onConfirm instanceof Function) {
        onConfirm(data)
        if (this.jsoneditor) {
          setTimeout(() => {
            this.jsoneditor?.destroy();
            this.jsoneditor = undefined;
          }, 500);
        }
      }
    } catch (error) {
      message.error('数据错误，请检查！')
    }
  }

  handleCancel = (e: any) => {
    if ( this.props.onCancel instanceof Function) {
      this.props.onCancel(e);
      if (this.jsoneditor) {
        setTimeout(() => {
          this.jsoneditor?.destroy();
          this.jsoneditor = undefined;
        }, 500);
      }
    }
  }

  copy = () => {
    try {
      const data = this.jsoneditor?.get();
      this.setState({
        newData: data,
      }, () => message.success('已复制到剪切板！'))
    } catch (error) {
      message.error('数据错误，请检查！')
    }
  }

  render() {
    const { data, onConfirm, onOk, ...other } = this.props;
    const { newData, disabled } = this.state;
    return (
      <Modal {...other} onOk={this.handleOk} onCancel={this.handleCancel} okButtonProps={{disabled}} >
        <CopyToClipboard
            text={JSON.stringify(newData)}
            onCopy={this.copy}
          >
            <Button size="small" icon={<CopyOutlined alt="复制到剪切板" />}>
              复制
            </Button>
          </CopyToClipboard>
        <div ref={elem => this.container = elem} />
      </Modal>
    )
  }
}

