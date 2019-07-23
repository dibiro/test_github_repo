/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {login} from "../redux/actions/authActions"
import { withRouter } from 'react-router'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipOpen: false,
      report: {},
    }
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin(){
    const {login, history} = this.props
    const {username, password} = this.state
    login(username, password, history.push)
  }
  render(){
    const {history, isAuth, user, error} = this.props
    if (isAuth && user){
      history.push("/home")
    }
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Input
                  placeholder='Username'
                  leftIcon={{ type: 'font-awesome', name: 'user' }}
                  onChangeText={(username) => this.setState({username})}
                  />
                <Input
                  onChangeText={(password) => this.setState({password})}
                  placeholder='Password'
                  secureTextEntry
                  leftIcon={{ type: 'font-awesome', name: 'lock' }}
                />
                <View style={styles.button}>
                  <Button
                    style={styles.button}
                    onPress={this.handleLogin}
                    icon={
                      <Icon
                        name="github"
                        size={15}
                        color="white"
                      />
                    }
                    title=" login with github"
                  />
                </View>
                <Text>{error}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  button: {
    marginTop: 10,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default withRouter(connect((state) => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
  error: state.auth.error,
}), { login })(Index))
