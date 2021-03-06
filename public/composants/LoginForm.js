var React = require('react');
var Router = require('react-router-dom').BrowserRouter
var Route = require('react-router-dom').Route
var Link = require('react-router-dom').Link
var Title = require('./Title.js');
var Redirect = require('react-router').Redirect

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.state ={email : '', password : '', loginConfirm: this.props.loginConfirm };
  }
  handleChange1(event){
    this.setState({email : event.target.value});
  }
  handleChange2(event){
    this.setState({password : event.target.value});
  }
  handleSubmit(event){
  var appObj = this;
      fetch(serverPath+'/login?email='+this.state.email+'&password='+this.state.password, {
            method: 'get'
          }).then(function(response) {
            return response.json();
          }).then(function(obj) {

            if(obj.isLog == true){
              appObj.setState({loginConfirm:true});
              appObj.props.onIncreaseSubmit(obj);

            } else {
              if(obj.error == 'invalide'){
                alert('email ou mot de passe invalide');
              } else {
                if(obj.error == 'vide'){
                  alert('saisir email et mot de passe' );
                }
              }
            }
          });

          event.preventDefault();
          this.setState({email:'', password:''});

        }

  render() {
    var redirection = '';
    if(this.state.loginConfirm == true){
      var redirection = <Redirect to='/profile' />;
    }

    return (
        <div>
            {redirection}
            <header className="bar bar-nav">
              <Link className="icon icon-close pull-right" to="/"></Link>
              <h1 className="title" id="title2">Login</h1>
            </header>
            <div className="content">
              <div className="form-login">
              <form onSubmit={this.handleSubmit}>
                <label>
                  <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange1} />
                </label>
                <label>
                  <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange2} />
                </label>
                  <input type="submit" className="submit" value="Se connecter" />
              </form>
            </div>
          </div>
        </div>
    );
  }
}
module.exports = LoginForm;
