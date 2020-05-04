import graphene

from graphene_django.types import DjangoObjectType

from deckviewer.decks.models import Deck, Card, DeckCard


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
        return Deck.objects.filter(player__isnull=True)

    @staticmethod
    def resolve_all_cards(parent: None, info, **kwargs):
        return Card.objects.all()

    @staticmethod
    def resolve_all_deckcards(parent: None, info, **kwargs):
        deckcards = DeckCard.objects.select_related("deck").select_related("card").all()

        return deckcards


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
