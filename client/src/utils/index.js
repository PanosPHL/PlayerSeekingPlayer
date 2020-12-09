export const defaultInvitationMessage = (otherUser, self, band, invitationType) => {
    if (invitationType === 'sent') {
        return `Hello ${otherUser.firstName} ${otherUser.lastName}!\nThe members of ${band.name} are excited to extend an invitation for you to join our group. Feel free to accept or decline at your earliest convenience.\nBest,\n${self.firstName} ${self.lastName}`;
    } else {
        return `Hello ${self.firstName} ${self.lastName}!\nThe members of ${band.name} are excited to extend an invitation for you to join our group. Feel free to accept or decline at your earliest convenience.\nBest,\n${otherUser.firstName} ${otherUser.lastName}`;
    }
}

export const invitationRowDate = (date) => {
    let diff = Math.floor(((Date.now() - Date.parse(date)) / 1000) / 86400);

    return diff < 1 ? "Today" : diff === 1 ? "Yesterday" : `${diff} days ago`;
}