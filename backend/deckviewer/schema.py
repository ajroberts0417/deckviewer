import graphene

from deckviewer.decks.schema import Query as DecksQuery, Mutation as DecksMutation


class Query(DecksQuery, graphene.ObjectType):
    pass


class Mutation(DecksMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
