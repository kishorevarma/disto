disto
---
another take on [flux](http://facebook.github.io/flux)

- strictly follows the original flux architecture
- a simple api, with no new concepts
- stores and action creators are just functions
- shorthand notation for action creators, with async function / promise support
- [live editing experience](https://github.com/threepointone/disto-hot-loader) across action creators / stores / views
- [timetravel utilities](https://github.com/threepointone/disto-example/blob/master/_rest/record.js)
- includes mixin to polyfill [sideloading data on components](https://github.com/facebook/react/issues/3398)
- react-native compatible, because apparently that's a thing now
- i love you

```js
// Here, stores are represented as reduce functions
// on every [actions, ...args] message that passes through the "system".
// You register them onto the dispatcher with an initial state, and you're good to go.

var dispatcher = new Dis();

let store = dispatcher.register({
  q: '',
  res: [],     // initial state
  err: null
}, function(state, action, ...args) {
  switch(action){

    case 'QUERY':
      let [q] = args;
      return {
        ...state, q
      };

    case 'QUERY_DONE':
      let [err, res] = args;
      return {
        ...state, err, res
      };

    default:
      return state;
  }
});

store.get()   // returns current value

let {dispose} = store.subscribe(fn)

// notice the conspicuous lack of a .setState()

// The dispatcher uses the facebook dispatcher under the hood, with a nicer api for these stores.

dispatcher.unregister(store)

dispatcher.dispatch(action, ...args)

dispatcher.waitFor(...stores)

// Actions can be whatever you please.
// We include a helper to make debug friendly action collections
// It's quite funky. See the unit tests and examples for more details.

```

Also included is @gaearon's [superb take](https://gist.github.com/gaearon/7d94c9f38fdd34a6e690) on a polyfill for [side loading data](https://github.com/facebook/react/issues/3398)
```js
var App = React.createClass({
  mixins: [mix],
  observe: function(){
    return {store1, store2}
  },
  render: function() {
    return (
      <div className="App">
        {this.state.data.store1}
        {this.state.data.store2}
      </div>
    );
  }
});
```

