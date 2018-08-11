// import ''

const container = WrappedComponent => {
  // console.log('simpleHoc');
  return class Inheritance extends WrappedComponent {
    constructor(props) {
      super(props);
      this.state = {
        ...this.state,
        showFlashMessage: false
      };
      this.flashMessageCallback = this.flashMessageCallback.bind(this);
    }

    flashMessageCallback() {
      this.setState({
        showFlashMessage: false
      });
    }

  }
}

// const container = target => {
//   target.showFlashMessage = false;
// }

export default container