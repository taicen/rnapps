/* eslint-disable react/no-unused-state */
import React, { Component, createContext } from 'react';

const MainScreenContext = createContext({
  showListHandler: () => {},
  showListState: false,
  showResultsHandler: () => {},
  showResults: false,
  getResultList: () => {},
  resultList: null,
});
/*
  <==> 
  MSContextProvider (Main Screen Context Provider) - provider, which provides data from context to childs. Used in Main Screen. Used iin
  -> Main Screen component
  <==>
*/
export class MSContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultList: null,
      getResultList: this.getResultList,
      showListState: false,
      showListHandler: this.showListHandler,
      showResults: false,
      showResultsHandler: this.showResultsHandler,
    };
  }

  getResultList = results => {
    this.setState({
      resultList: results,
    });
  };

  showListHandler = newState => {
    this.setState({
      showListState: newState,
    });
  };

  showResultsHandler = newState => {
    this.setState({
      showResults: newState,
    });
  };

  render() {
    const { children } = this.props;
    return <MainScreenContext.Provider value={this.state}>{children}</MainScreenContext.Provider>;
  }
}

/*
  <==> 
  MSContextConsumer (Main Screen Context Consumer) - consumer, which takes provided data from Main Screen context. Used in 
  -> MainScreen,
  -> SearchBlock, 
  -> ShowList, 
  -> Results 
  components 
  <==>
*/
export const MSContextConsumer = MainScreenContext.Consumer;
