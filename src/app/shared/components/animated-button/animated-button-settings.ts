export interface IAnimatedButtonSettings {
    defaultClass: string;
    iconPosition: string;
    submittingClass: string;
    successClass: string;
    errorClass: string;
}

export const animatedButtonDefaultSettings: IAnimatedButtonSettings = {
    defaultClass: 'btn-primary',
    submittingClass: 'btn-info',
    successClass: 'btn-success',
    errorClass: 'btn-danger',
    iconPosition: 'left'
};

export interface ICssClasses {
    [cssClass: string]: boolean;
}
