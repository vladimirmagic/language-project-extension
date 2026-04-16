export interface IAppFields {
  showTooltip: boolean
}

export interface IAppEvents {
  onClick: () => void
}

export interface IAppProps extends
  IAppFields,
  IAppEvents
{}