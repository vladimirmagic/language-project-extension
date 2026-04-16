
import { connect } from 'react-redux';
import { Container } from '../components/Container';
import { IContainerEvents, IContainerFields } from '../components/types';
import { ContainerEvents } from './events';
import { IState } from '../../../types';

const mapStateToProps = (
  dispatch: any
) => {
  return (
    state: IState
  ): IContainerFields => {
    return {}
  };
}

const mapDispatchToProps = (
  dispatch: any
): IContainerEvents => ({
    onVideoChange: url => dispatch(ContainerEvents.onVideoChange(url)),
    onShowTooltipChange: show => dispatch(ContainerEvents.onShowTooltipChange(show))
  }
);

export const ContainerHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container) as any;

ContainerHOC.displayName = 'ContainerHOC';