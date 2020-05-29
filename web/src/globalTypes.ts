/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DefaultDecks
// ====================================================

export interface DefaultDecks_defaultDecks_cards {
  __typename: "CardType";
  id: string;
  name: string;
  cardType: CardCardType;
  classType: CardClassType;
  cost: number;
  range: string;
  rulesText: string;
}

export interface DefaultDecks_defaultDecks {
  __typename: "DeckType";
  id: string;
  name: string;
  cards: (DefaultDecks_defaultDecks_cards | null)[] | null;
}

export interface DefaultDecks {
  defaultDecks: (DefaultDecks_defaultDecks | null)[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerDecks
// ====================================================

export interface PlayerDecks_player_decks_cards {
  __typename: "CardType";
  id: string;
  name: string;
  cardType: CardCardType;
  classType: CardClassType;
  cost: number;
  range: string;
  rulesText: string;
}

export interface PlayerDecks_player_decks {
  __typename: "DeckType";
  id: string;
  name: string;
  cards: (PlayerDecks_player_decks_cards | null)[] | null;
}

export interface PlayerDecks_player {
  __typename: "PlayerType";
  decks: (PlayerDecks_player_decks | null)[] | null;
}

export interface PlayerDecks {
  player: PlayerDecks_player | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenAuth {
  __typename: "ObtainJSONWebToken";
  payload: any;
  refreshExpiresIn: number;
  token: string;
}

export interface TokenAuth {
  /**
   * Obtain JSON Web Token mutation
   */
  tokenAuth: TokenAuth_tokenAuth | null;
}

export interface TokenAuthVariables {
  username: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * An enumeration.
 */
export enum CardCardType {
  ACTION = "ACTION",
  PERMANENT = "PERMANENT",
  REACTION = "REACTION",
}

/**
 * An enumeration.
 */
export enum CardClassType {
  CLERIC = "CLERIC",
  FIGHTER = "FIGHTER",
  NEUTRAL = "NEUTRAL",
  RANGER = "RANGER",
  WIZARD = "WIZARD",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
