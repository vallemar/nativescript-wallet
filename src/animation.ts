import { SharedTransitionConfig, Screen, isAndroid } from "@nativescript/core";

export const configHomeSharedTransition: SharedTransitionConfig = {
    interactive: {
        dismiss: {
            finishThreshold: 0.5,
        },
    },
    pageStart: {
        opacity: 1,
        x: 0,
        y: isAndroid ? Screen.mainScreen.heightPixels : undefined,
    },
    pageEnd: {
        spring: { tension: 70, friction: 9, mass: 1 },
    },
    pageReturn: {
        opacity: 1,
        spring: { tension: 70, friction: 9, mass: 2 },
    },
};