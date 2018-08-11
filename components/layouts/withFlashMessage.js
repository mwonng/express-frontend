// import ''

const container = WrappedComponent => {
  // console.log('simpleHoc');
  return class Inheritance extends WrappedComponent {
    constructor(props) {
      super(props);
      this.state = {
        ...this.state,
        showFlashMessage: false
      }
    }

    notifyEnd() {
      this.setState({
        showFlashMessage: false
      });
    }

    componentDidMount() {
      console.log("withFlashMessage!!", this.state);
    }

    render() {
      return super.render();
    }
  }
}

// const container = target => {
//   target.showFlashMessage = false;
// }

export default container