import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
  PickerIOS,
  Slider,
  StatusBar
} from 'react-native';
import Actions from 'react-native-router-flux';
import globalVariables from '../styles/globalVariables.js'
import PricePickerContainer from './PricePickerContainer.js'
import YearPickerContainer from './YearPickerContainer.js'
import CarConditionPicker from './CarConditionPicker.js';
import CarMakePickerContainer from './CarMakePickerContainer.js';
import ZipCodeContainer from './ZipCodeContainer.js';
import setQueryAction from '../actions/setQueryAction.js';
import searchActions from '../actions/searchActions.js';
import MultiSlider from 'react-native-multi-slider';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import HeaderContainer from './common/HeaderContainer.js';
import Icon from 'react-native-vector-icons/Ionicons';
import ListViewer from './common/ListViewer.js';

let PickerItemIOS = PickerIOS.Item;

@connect(state => ({
  query: state.search,
  CAR_MAKES_AND_MODELS: state.search.allCars
}))
export default class Search extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    query: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  goToResults() {
    console.log('going');
    console.log(this.props.query);
    this.props.dispatch(searchActions(this.props.query));
  }


  render() {
    var action = Actions
    const favorites =(<Icon name="ion-ios-heart" size={30} color="#900" />)
    const rightItem = {
      title: 'favorites',
      icon: favorites,
      onPress: 'Actions.Favorites.bind(this)'
    };
    const results = (<Icon name="ion-model-s" size={30} color="#900" />)
    const leftItem = {
      title: 'results',
      icon: results,
      onPress: 'Actions.Results.bind(this)'
    }
    return (
      <HeaderContainer
        title="Search"
        // parallaxContent={profilePicture}
        backgroundImage={require('../assets/images/main-background.png')}
        backgroundColor={'#A8D769'}
        // onSegmentChange={this.handleSegmentChanged}
        leftItem={leftItem}
        rightItem={rightItem}>
        <ListViewer
        renderEmptyList={this.renderScrollView.bind(this)}

        >
        </ListViewer>

      </HeaderContainer>

  )
  }
  renderScrollView(){
    return (
        <View >

          <CarMakePickerContainer />
          <PricePickerContainer />
          <YearPickerContainer />
          <ZipCodeContainer />
          <CarConditionPicker />

        <TouchableHighlight
          underlayColor="#88D4F5"
          onPress={this.goToResults.bind(this)}
        >
        <Text>Search </Text>
        </TouchableHighlight>

        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: globalVariables.background
  },

  page: {
    paddingBottom: 50
  },

  searchButton: {
    padding: 14,
    backgroundColor: globalVariables.green
  },

  searchButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
});
