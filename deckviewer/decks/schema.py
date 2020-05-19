import graphene

from graphene_django.types import DjangoObjectType
from airtable import Airtable

from deckviewer.decks.models import Card, Deck, DeckCard

airtable = Airtable('appr7aUJe07RDR9Ho', 'DeckCard')  # for DeckCard table


class CardType(DjangoObjectType):
    class Meta:
        model = Card


class DeckCardType(DjangoObjectType):
    class Meta:
        model = DeckCard


class DeckType(DjangoObjectType):
    class Meta:
        model = Deck

    cards = graphene.List(CardType)

    def resolve_cards(parent: Deck, info, **kwargs):
        deckcards = DeckCard.objects.select_related("card").filter(deck=parent)
        cards = [deckcard.card for deckcard in deckcards]
        return cards
        # deckcards = airtable.get_all(
        #     view='Edit View',
        #     formula="Deck='{}'".format(parent.id)
        # )

        # cards: List[DeckCardType] = []
        # for card in deckcards:
        #     card_type = CardType()
        #     card_type.airtable_id = card.get("id")
        #     card_type.name = card["fields"].get("cardName")[0]
        #     card_type.cost = card["fields"].get("cardCost")[0]
        #     card_type.rulesText = card["fields"].get("rulesText")[0]
        #     card_type.classType = card["fields"].get("cardClass")[0]
        #     card_type.range = card["fields"].get("cardRange")[0]
        #     # card_type.attackType = card["fields"].get("cardType")[0]
        #     cards.append(card_type)
        # return cards


class Query(object):
    player_decks = graphene.List(DeckType)
    default_decks = graphene.List(DeckType)
    all_cards = graphene.List(CardType)
    all_deckcards = graphene.List(DeckCardType)

    @staticmethod
    def resolve_player_decks(parent: None, info, **kwargs):
        return Deck.objects.filter(player__user=info.context.user)

    @staticmethod
    def resolve_default_decks(parent: None, info, **kwargs):
        return Deck.objects.filter(player__isnull=True)  # ids for the respective decks

    @staticmethod
    def resolve_all_cards(parent: None, info, **kwargs):
        return Card.objects.all()

    @staticmethod
    def resolve_all_deckcards(parent: None, info, **kwargs):
        deckcards = DeckCard.objects.select_related("deck").select_related("card").all()
        return deckcards
        # deckcards = airtable.get_all(view='Edit View')

        # deck_cards: List[DeckCardType] = []
        # for card in deckcards:
        #     card_type = CardType()
        #     card_type.airtable_id = card.get("id")
        #     card_type.name = card["fields"].get("cardName")[0]
        #     card_type.cost = card["fields"].get("cardCost")[0]
        #     card_type.rulesText = card["fields"].get("rulesText")[0]
        #     card_type.classType = card["fields"].get("cardClass")[0]
        #     card_type.range = card["fields"].get("cardRange")[0]
        #     # card_type.attackType = card["fields"].get("cardType")[0]
        #     deck = DeckType(name=card["fields"].get("deckName")[0])
        #     deck_card = DeckCardType(deck=deck, card=card_type)
        #     deck_cards.append(deck_card)

        # return deck_cards


class DeckMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        id = graphene.ID()

    deck = graphene.Field(DeckType)

    @staticmethod
    def mutate(parent: 'DeckMutation', info, **kwargs):
        deck = Deck.objects.get(pk=id)
        name = kwargs.get("name")
        deck.name = name
        deck.save()
        return DeckMutation(deck=deck)


class Mutation(graphene.ObjectType):
    update_deck = DeckMutation.Field()
