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

    deckcards = graphene.List(DeckCardType)

    def resolve_deckcards(parent: Deck, info, **kwargs):
        deckcards = DeckCard.objects.filter(deck=parent).select_related('card')
        return deckcards


class PlayerType(DjangoObjectType):
    class Meta:
        model = Player

    playercards = graphene.List(CardType)
    decks = graphene.List(DeckType)
    user = graphene.Field(UserType)

    def resolve_playercards(parent: Player, info, **kwargs):
        playercards = PlayerCard.objects.filter(player=parent)
        return playercards

    def resolve_decks(parent: Player, info, **kwargs):
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
        starter_deck_id = graphene.Int(required=True)
        user_id = graphene.Int(required=False, default_value=None)

    ok = graphene.Boolean()
    player = graphene.Field(PlayerType)
    deck = graphene.Field(DeckType)

    @staticmethod
    def mutate(parent: "CreatePlayerMutation", info, starter_deck_id, user_id=None):
        user = info.context.user
        if user_id and info.context.user.is_staff:
            user = user_id
        player = Player.objects.create(user=user)
        starter_deck = Deck.objects.get(pk=starter_deck_id)
        starter_deckcards = DeckCard.objects.filter(deck=starter_deck)

        player_cards = [
            PlayerCard(player=player, card=dc.card) for dc in starter_deckcards
        ]
        PlayerCard.objects.bulk_create(player_cards)

        new_starter_deck = Deck.objects.create(name=starter_deck.name, player=player)

        new_starter_deckcards = [
            DeckCard(deck=new_starter_deck, card=dc.card) for dc in starter_deckcards
        ]
        DeckCard.objects.bulk_create(new_starter_deckcards)
        return CreatePlayerMutation(player=player, deck=new_starter_deck, ok=True)


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
        return CreateDeckCardMutation(deck_card=deck_card)


class DeleteDeckCardMutation(graphene.Mutation):
    class Arguments:
        deckcard_id = graphene.Int(required=True)

    ok = graphene.Boolean()

    @staticmethod
    def mutate(parent: "DeleteDeckCardMutation", info, deckcard_id):
        DeckCard.objects.get(pk=deckcard_id).delete()
        return DeleteDeckCardMutation(ok=True)


class Mutation(graphene.ObjectType):
    update_deck = DeckMutation.Field()
    create_player = CreatePlayerMutation.Field()
    create_deckcard = CreateDeckCardMutation.Field()
    delete_deckcard = DeleteDeckCardMutation.Field()
