/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CardCardType, CardClassType } from "./../../__generated__/globalTypes";

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
