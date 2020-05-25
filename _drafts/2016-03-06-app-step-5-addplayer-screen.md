---
layout: default
title: App Step 5 AddPlayer Screen
---
# App Step 5 AddPlayer Screen
I don't expect to use this screen very often - after the initial entry of the "usual suspects" I expect we'll add someone every two or three months. The edit screen (which will probably only ever update the player's email address) can be built at some point in the future - won't be needed for the MVP.

There are only two pieces of information we want to capture when adding a player:

* their name, such as JohnB or DaveW.
* their email, to send invites and results

So, just add this to `AddPlayer.jsx`:

```
AddPlayer = React.createClass({
    propTypes: {
        player: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div>
                <span class='playerName'>
                    <input value={this.props.player.name}></input>
                </span>
                <span class='playerEmail'>
                    <input value={this.props.player.email}></input>
                </span>
                <span class='addPlayerButton'>
                    <button>Add Player</button>
                </span>
            </div>
        );
    }
});
```

And call it from somewhere in the `render()` function in `App.jsx`:

`<AddPlayer player={{name: 'JohnB', email: 'john.baylor@gmail.com'}} />`

At this point we see the fields in the browser, but also see these helpful messages in the console:

```
Warning: Unknown DOM property class. Did you mean className?
Warning: Failed form propType: You provided a `value` prop to a form field without an `onChange` handler. 
  This will render a read-only field. If the field should be mutable use `defaultValue`. 
  Otherwise, set either `onChange` or `readOnly`. Check the render method of `AddPlayer`.
```

This is a nice reminder that React uses `className` instead of `class`, since `class` is a reserved word in HTML and Javascript.

The other error is nice, but unexpected. And, sure enough, I can't change the field. Since I just need to *get* the value when the button is pressed, I'll just change to `defaultValue` and be done with it.

```
AddPlayer = React.createClass({
    propTypes: {
        player: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <div>
                <span className='playerName'>
                    <input defaultValue={this.props.player.name}></input>
                </span>
                <span className='playerEmail'>
                    <input defaultValue={this.props.player.email}></input>
                </span>
                <span className='addPlayerButton'>
                    <button>Add Player</button>
                </span>
            </div>
        );
    }
});
```

Adding the event handlers yields this:

```
AddPlayer = React.createClass({
    propTypes: {
        player: React.PropTypes.object.isRequired
    },
    AddThisPlayer: function(event) {
        console.log('AddThisPlayer?');
        console.log(this.state);
    },
    handleNameChange: function(event) {
        this.setState({name: event.target.value});
    },
    handleEmailChange: function(event) {
        this.setState({email: event.target.value});
    },
    render() {
        return (
            <div>
                <span className='playerName'>
                    <input type="text"
                           defaultValue={this.props.player.name}
                           onChange={this.handleNameChange}
                        />
                </span>
                <span className='playerEmail'>
                    <input type="text"
                           defaultValue={this.props.player.email}
                           onChange={this.handleEmailChange}
                        />
                </span>
                <span className='addPlayerButton'>
                    <button onClick={this.AddThisPlayer}>Add Player</button>
                </span>
            </div>
        );
    }
});
```

This seems like a good stopping point. A simple component that just sets its state.