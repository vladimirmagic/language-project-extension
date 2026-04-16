
import { connect } from 'react-redux';
import { IAppEvents, IAppFields } from '../components/types';
import { App } from '../components/App';
import { AppEvents } from './events';
import { YoutubeButtonSelectors } from '../../../store/selectors';
import { IState } from '../../../types';

const mapStateToProps = (
  dispatch: any
) => {
  return (
    state: IState
  ): IAppFields => {
    return {
      showTooltip: YoutubeButtonSelectors.isShowTooltip(state)
    }
  };
}

const mapDispatchToProps = (
  dispatch: any
): IAppEvents => ({
    onClick: () => dispatch(AppEvents.onClick())
  }
);

export const AppHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

AppHOC.displayName = 'AppHOC';
