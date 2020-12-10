import { initialInvitationUIState } from '../store/ui/invitations';
import { initialMyBandsState } from '../store/ui/myBands';
import { initialNavbarUIState } from '../store/ui/navbar';
import { initialProfilePageUIState } from '../store/ui/profilePage';
import { initialSignUpFormUIState } from '../store/ui/signUpForm';
import { initialSessionState } from '../store/session';

export const saveState = (state) => {
    if (!state.session.userId) {
        localStorage.clear();
        return;
    }

    state.session = initialSessionState;

    state.ui = {
        uiInvitations: initialInvitationUIState,
        myBands: initialMyBandsState,
        navbar: initialNavbarUIState,
        profilePage: initialProfilePageUIState,
        signUpForm: initialSignUpFormUIState
    }

    try {
        const stateToSave = JSON.stringify(state);
        localStorage.setItem('state', stateToSave);
    } catch (err) {
        console.error(err);
    }
}

export const loadState = () => {
    try {
        const preloadedState = localStorage.getItem("state");
        if (!preloadedState) {
            return {};
        }
        return JSON.parse(preloadedState);
    } catch (err) {
        return {};
    }
}