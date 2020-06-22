## Conditional Rendering
- With react you can wrap distinct components and encapsulate behavior as needed
- Then you can render components based on the state of your component state
- This works using `if` statements
```javascript
function greetings(props) {
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn) {
    return <UserGreeting />
  }

  return <GuessGreeting />
}
```

### Element variables
- You can use variables to store elements
- Example:
```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

### Inline If with Logical && Operator
- You may embed any expression in JSX
- Another way to perform **Conditional Rendering** is using `{ && }`
```javascript
function MailBox(props) {
  const unreadMessages = props.unreadMessages;
  
  return (
    <h1>Welcome!</h1>
    <div>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```
- It works due:
  - `true && expression` returns `expression`
  - `false && expression` return `false`
- Remember that this works as short circuit

### Inline if-else with conditional operator
- React as well uses `if-else` for rendering
```javascript
  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in
      </div>
    );
  }
```
- It can be used as well in larger expressions
```javascript
  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        {isLoggedIn
          ? <LogoutButton onClick={this.handleLogoutClick} />
          : <LoginButton onClick={this.handleLoginClick} />
        }
      </div>
    );
  }
```

### Preventing Component from Rendering
- If you want to hide a component then return `null`
```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```
- Returning `null` does not affect the component lifecycle, for instance `componentDidUpdate` will be called
