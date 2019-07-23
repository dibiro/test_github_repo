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
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'

// componet style
import { Header, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

// redux
import {connect} from 'react-redux'
import {get_commints} from "../redux/actions/repoActions"
import {logout} from "../redux/actions/authActions"

// navigation
import { withRouter } from 'react-router'


class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltipOpen: false,
      repo: "facebook/react-native",
    }
  }
  render(){
    const {comments, history, isAuth, user, logout} = this.props
    if (!isAuth && !user){
      history.push("/")
    }
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <Header
          leftComponent={
            <TouchableOpacity
              onPress={()=>{history.push("/home");}}
            >
              <Icon
                name="arrow-left"
                size={25}
                color="white"
              />
            </TouchableOpacity>
          }
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
                {comments && comments.map && comments.map((comment)=>
                  <View>
                    <ListItem
                      leftAvatar={{
                          title: comment.author ? comment.author.login[0] : ( comment.committer ? comment.committer.login[0] : comment.commit.author.name[0]),
                          source: { uri: comment.author ? comment.author.avatar_url : ( comment.committer ? comment.committer.avatar_url : '') },
                      }}
                      key={comment.id}
                      title={comment.author ? comment.author.login : ( comment.committer ? comment.committer.login : comment.commit.author.name)}
                      subtitle={comment.commit.message}
                    />
                  </View>
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
  comments: state.repo.comments,
}), { get_commints, logout })(Comments))
