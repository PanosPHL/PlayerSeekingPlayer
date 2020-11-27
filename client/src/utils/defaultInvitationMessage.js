export const defaultInvitationMessage = (user, band) => {
    return `Hello ${user.firstName} ${user.lastName}!\nThe members of ${band.name} are excited to extend an invitation for you to join our group. Feel free to accept or decline at your earliest convenience.\nBest,\n${user.firstName} ${user.lastName}`;
}