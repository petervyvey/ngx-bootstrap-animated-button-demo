export interface IAnimatedButtonSettings {
    defaultClass: string;
    iconPosition: string;
    submittingClass: string;
    successClass: string;
    errorClass: string;
    submittingTimeOut: number;
    completedTimeOut: number;
    returnToDefaultState: boolean;
    enabledOnSuccess: boolean;
}

export const animatedButtonDefaultSettings: IAnimatedButtonSettings = {
    defaultClass: 'btn-primary',
    submittingClass: 'btn-info',
    successClass: 'btn-success',
    errorClass: 'btn-danger',
    iconPosition: 'left',
    submittingTimeOut: 900,
    completedTimeOut: 2000,
    returnToDefaultState: true,
    enabledOnSuccess: true
};

export interface ICssClasses {
    [cssClass: string]: boolean;
}
