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
    const {comments} = this.props
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                {comments && comments.map && comments.map((comment)=>
                  <ListItem
                    leftAvatar={{
                        title: comment.committer.login[0],
                        source: { uri: comment.committer.avatar_url },
                    }}
                    key={comment.id}
                    title={comment.commit.committer.name}
                    subtitle={comment.commit.message}
                  />
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
}), { get_commints })(Comments))
