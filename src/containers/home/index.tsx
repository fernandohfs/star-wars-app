import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {ScrollView, StyleSheet} from 'react-native';
import {Layout, Card, Text} from '@ui-kitten/components';

import {ROUTES_NAMES} from '../../routes';

import HomeStore from '../../stores/home.store';

interface Props {
  homeStore: HomeStore;
  navigation: any;
}

@inject('homeStore')
@observer
export default class Home extends Component<Props> {
  async componentDidMount() {
    const {getFilms} = this.props.homeStore;
    await getFilms();
  }

  render() {
    const {films} = this.props.homeStore;

    const navigateScreen = (id: number) => {
      const {navigate} = this.props.navigation;
      navigate(ROUTES_NAMES.Film, {id});
    };

    return (
      <Layout>
        <ScrollView>
          {films.map((film, index) => (
            <Card onPress={() => navigateScreen(film.id)} key={index}>
              <Text style={styles.title}>{film.title}</Text>
              <Text>Episode {film.episode_id.toString()}</Text>
            </Card>
          ))}
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'black',
    color: 'white',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
  },
});
