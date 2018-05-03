export interface IAnimatedButtonSettings {
    defaultClass: string;
    iconPosition: string;
}

export const animatedButtonDefaultSettings: IAnimatedButtonSettings = {
    defaultClass: 'btn-primary',
    iconPosition: 'left'
};

export interface ICssClasses {
    [cssClass: string]: boolean;
}
