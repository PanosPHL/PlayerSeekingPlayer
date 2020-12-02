export const defaultInvitationMessage = (user, band) => {
    return `Hello ${user.firstName} ${user.lastName}!\nThe members of ${band.name} are excited to extend an invitation for you to join our group. Feel free to accept or decline at your earliest convenience.\nBest,\n${user.firstName} ${user.lastName}`;
}

export const invitationRowDate = (date) => {
    let diff = Math.floor(((Date.now() - Date.parse(date)) / 1000) / 86400);

    return diff < 1 ? "Today" : diff === 1 ? "Yesterday" : `${diff} days ago`;
}