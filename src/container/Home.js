/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 // react 
import React, {Fragment} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity ,
  StatusBar,
} from 'react-native'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'

// componet style
import { Button, Input, ListItem, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

// redux
import {connect} from 'react-redux'
import {logout} from "../redux/actions/authActions"
import {get_repos, set_repo, get_commints} from "../redux/actions/repoActions"

// navigation
import { withRouter } from 'react-router'


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipOpen: false,
      repo: "facebook/react-native",
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.selectRep = this.selectRep.bind(this)
  }
  handleSearch(){
    const {get_repos} = this.props
    const {repo} = this.state
    get_repos(repo)
  }
  selectRep(rep){
    const {set_repo, history, get_commints} = this.props
    set_repo(rep)
    get_commints(rep)
    history.push("/comments")
  }
  componentDidMount(){
    this.props.get_repos("facebook/react-native")
  }
  render(){
    const {repos, history, isAuth, user, logout} = this.props
    if (!isAuth && !user){
      history.push("/")
    }
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <Header
          leftComponent={<Icon
            name="github"
            size={25}
            color="white"
          />}
          centerComponent={{ text: 'GitHub Viewer', style: { color: '#fff' } }}
          rightComponent={
            <TouchableOpacity
              onPress={logout}
            >
              <Icon
                name="sign-out"
                size={25}
                color="white"
              />
            </TouchableOpacity>
          }
        />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Input
                  placeholder='repo'
                  value={this.state.repo}
                  leftIcon={{ type: 'font-awesome', name: 'user' }}
                  onChangeText={(repo) => this.setState({repo})}
                  />
                <View style={styles.button}>
                  <Button
                    style={styles.button}
                    onPress={this.handleSearch}
                    icon={
                      <Icon
                        name="search"
                        size={15}
                        color="white"
                      />
                    }
                    title=" Search"
                    />
                </View>
                {repos && repos.map && repos.map((rep)=>
                  <TouchableOpacity
                    key={rep.id}
                    onPress={() => {
                      this.selectRep(rep);
                    }}
                  >
                    <ListItem
                      title={rep.name}
                      subtitle={rep.description}
                      chevron
                    />
                  </TouchableOpacity> 
                )}
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
  repos: state.repo.repos,
}), { get_repos, set_repo, get_commints, logout })(Home))
