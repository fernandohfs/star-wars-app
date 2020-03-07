import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {StyleSheet} from 'react-native';
import {
  Layout,
  Card,
  CardHeader,
  Button,
  Input,
  Text,
  Modal,
} from '@ui-kitten/components';

import HomeStore from '../../stores/home.store';

interface Props {
  homeStore: HomeStore;
}

const Header = () => (
  <CardHeader title="Informe os valores dos combustíveis atualmente" />
);

@inject('homeStore')
@observer
export default class Home extends Component<Props> {
  state = {
    modalVisible: false,
  };

  closeModal = () => {
    this.setState({modalVisible: false});
  };

  openModal = () => {
    const {calculate} = this.props.homeStore;

    /**
     * Calculate the result
     */
    calculate();

    this.setState({modalVisible: true});
  };

  renderModalElement = result => (
    <Layout level="3" style={styles.modalContainer}>
      <Text style={styles.paragraph}>{result}</Text>
      <Button onPress={() => this.closeModal()}>Fechar</Button>
    </Layout>
  );
  render() {
    const {ethanol, gasoline, result, handleForm} = this.props.homeStore;

    return (
      <>
        <Layout style={styles.container}>
          <Card header={Header} status="success">
            <Text>Etanol:</Text>
            <Input
              keyboardType={'numeric'}
              value={ethanol.toString()}
              onChangeText={ethanol => handleForm({ethanol})}
            />
            <Text>Gasolina:</Text>
            <Input
              keyboardType={'numeric'}
              value={gasoline.toString()}
              onChangeText={gasoline => handleForm({gasoline})}
            />
            <Button onPress={() => this.openModal()} style={styles.button}>
              Calcular
            </Button>
          </Card>
        </Layout>
        <Modal
          backdropStyle={styles.backDrop}
          onBackdropPress={() => this.closeModal()}
          visible={this.state.modalVisible}>
          {this.renderModalElement(result)}
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingVertical: 125,
    paddingLeft: 15,
    paddingRight: 15,
    minHeight: '100%',
    backgroundColor: '#2b7cd7',
  },
  button: {
    marginTop: 25,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 256,
    padding: 16,
  },
  backDrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
