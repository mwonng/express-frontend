const withFlashMessage = WrappedComponent => {
  // console.log('simpleHoc');
  return class Inheritance extends WrappedComponent {
    constructor(props) {
      super(props);
      this.state = {
        ...this.state,
        showFlashMessage: false,
        flashMessage: {
          type:'error',
          message: ''
        }
      };
      this.isFlashMsgVisible = false;
      this.flashMessageCallback = this.flashMessageCallback.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    flashMessageCallback() {
      this.timer = setTimeout(
        () => this.setState({
          showFlashMessage: false
        }),
        500
      );
    }
  }
}

export default withFlashMessage