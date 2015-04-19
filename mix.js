"use strict";

// via @dan_abramov https://gist.github.com/gaearon/7d94c9f38fdd34a6e690

export default {
  getInitialState() {
    const data = {};

    this.subscribe(this.props, this.context, (key, value) => {
      data[key] = value;
    });
    this.unsubscribe();

    return { data };
  },

  componentWillMount() {
    this.subscribe(this.props, this.context, this.setData);
  },

  componentWillReceiveProps(props, context) {
    this.subscribe(props, context, this.setData);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  setData(key, value) {
    this.setState(prevState => ({data: {...prevState.data, [key]: value}}));
  },

  subscribe(props, context, onNext) {
    const newObservables = this.observe(props, context);
    const newSubscriptions = {};

    for (let key in newObservables) {
      newSubscriptions[key] = newObservables[key].subscribe({
        onNext: (value) => onNext(key, value),
        onError: () => {},
        onCompleted: () => {}
      });
    }

    this.unsubscribe();
    this.subscriptions = newSubscriptions;
  },

  unsubscribe() {
    Object.keys(this.subscriptions).forEach(key => this.subscriptions[key].dispose())    
    this.subscriptions = {};
  }
}