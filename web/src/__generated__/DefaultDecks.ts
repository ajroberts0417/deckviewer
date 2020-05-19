/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CardCardType } from "./globalTypes";

// ====================================================
// GraphQL query operation: DefaultDecks
// ====================================================

export interface DefaultDecks_defaultDecks_cards {
  __typename: "CardType";
  id: string;
  name: string | null;
  cardType: CardCardType;
  classType: string | null;
  cost: number | null;
  range: string | null;
  rulesText: string | null;
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
