import graphene
import graphql_jwt
from graphql_jwt.decorators import login_required

from deckviewer.decks.schema import Query as DecksQuery, Mutation as DecksMutation


class Query(DecksQuery, graphene.ObjectType):
    test_authentication = graphene.Field(graphene.String)

    @login_required
    def resolve_test_authentication(parent, info, **kwargs):
        return "You are authenticated"

    pass


class Mutation(DecksMutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
