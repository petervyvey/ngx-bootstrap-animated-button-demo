export interface IAnimatedButtonSettings {
    defaultClass: string;
    iconPosition: string;
    submittingClass: string;
    successClass: string;
    errorClass: string;
    submittingTimeOut: number;
    completedTimeOut: number;
}

export const animatedButtonDefaultSettings: IAnimatedButtonSettings = {
    defaultClass: 'btn-primary',
    submittingClass: 'btn-info',
    successClass: 'btn-success',
    errorClass: 'btn-danger',
    iconPosition: 'left',
    submittingTimeOut: 800,
    completedTimeOut: 2000
};

export interface ICssClasses {
    [cssClass: string]: boolean;
}
