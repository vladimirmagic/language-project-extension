export interface IContainerFields {
}

export interface IContainerEvents {
  onVideoChange: (url: string) => void,
  onShowTooltipChange: (show: boolean) => void;
}

export interface IContainerProps extends
  IContainerFields,
  IContainerEvents
{}

export const USER_GROUPS_KEY = 'langAppUserGroups';