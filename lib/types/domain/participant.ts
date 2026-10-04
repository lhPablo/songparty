export interface Participant {
  id: string;
  name: string;
  joinedAt: string;
}

// Server-side only: the secret proves ownership of the participant identity
export interface StoredParticipant extends Participant {
  secret: string;
}

// What the guest's browser keeps to act as a participant of a playlist
export interface ParticipantIdentity {
  participantId: string;
  name: string;
  secret: string;
}
