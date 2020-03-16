import { NavigationActions, StackActions } from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function reset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: routeName,
          params: params
        })
      ]
    })
  )
}

function back(routeName, params) {
  _navigator.dispatch(
    NavigationActions.back({
      routeName,
      params,
    })
  )
}

export default {
  navigate,
  reset,
  back,
  setTopLevelNavigator,
}