from deckviewer.decks.models import Card, Deck, DeckCard, Player, PlayerCard
from django.contrib.auth import get_user_model

import graphene

from graphene_django.types import DjangoObjectType

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User


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


class PlayerType(DjangoObjectType):
    class Meta:
        model = Player

    cards = graphene.List(CardType)
    decks = graphene.List(DeckType)
    user = graphene.Field(UserType)

    def resolve_cards(parent: Player, info, **kwargs):
        playercards = PlayerCard.objects.select_related("card").filter(player=parent)
        cards = [playercard.card for playercard in playercards]
        return cards

    def resolve_player_decks(parent: Player, info, **kwargs):
        return Deck.objects.filter(player=parent)
    
    def resolve_user(parent: Player, info, **kwargs):
        return parent.user


class Query(object):
    player = graphene.Field(PlayerType)
    starter_decks = graphene.List(DeckType)
    default_decks = graphene.List(DeckType)
    all_cards = graphene.List(CardType)
    all_deckcards = graphene.List(DeckCardType)

    @staticmethod
    def resolve_player(parent: None, info, **kwargs):
        return getattr(info.context.user, "player", None)

    @staticmethod
    def resolve_starter_decks(parent: None, info, **kwargs):
        return Deck.objects.filter(name__contains="Starter")

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


class CreatePlayerMutation(graphene.Mutation):
    class Arguments:
        user_id = graphene.Int(required=True)
        starter_deck_id = graphene.Int(required=True)

    player = graphene.Field(PlayerType)

    @staticmethod
    def mutate(parent: "CreatePlayerMutation", info, user_id, starter_deck_id):
        player = Player.objects.create(user=user_id)
        starter_deck = Deck.objects.get(pk=starter_deck_id)
        starter_deckcards = DeckCard.objects.filter(deck=starter_deck)

        player_cards = [
            PlayerCard(player=player, card=dc.card) for dc in starter_deckcards
        ]
        PlayerCard.bulk_create(player_cards)

        new_starter_deck = Deck.objects.create(name=starter_deck.name, player=player)

        new_starter_deckcards = [
            DeckCard(deck=new_starter_deck, card=dc.card) for dc in starter_deckcards
        ]
        DeckCard.bulk_create(new_starter_deckcards)
        return DeckMutation(player=player)


class DeckMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        id = graphene.ID(required=True)

    deck = graphene.Field(DeckType)

    @staticmethod
    def mutate(parent: "DeckMutation", info, **kwargs):
        deck = Deck.objects.get(pk=id)
        name = kwargs.get("name")
        deck.name = name
        deck.save()
        return DeckMutation(deck=deck)


class CreateDeckCardMutation(graphene.Mutation):
    class Arguments:
        card_id = graphene.Int(required=True)
        deck_id = graphene.Int(required=True)

    deck_card = graphene.Field(DeckCardType)

    @staticmethod
    def mutate(parent: "CreateDeckCardMutation", info, deck_id, card_id):
        deck_card = DeckCard.objects.create(deck=deck_id, card=card_id)
        return DeckMutation(deck_card=deck_card)


class DeleteDeckCardMutation(graphene.Mutation):
    class Arguments:
        deckcard_id = graphene.Int(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(parent: "DeleteDeckCardMutation", info, deckcard_id):
        DeckCard.objects.get(pk=deckcard_id).delete()
        return DeckMutation(ok=True)


class Mutation(graphene.ObjectType):
    update_deck = DeckMutation.Field()
    create_deckcard = CreateDeckCardMutation.Field()
    delete_deckcard = DeleteDeckCardMutation.Field()
