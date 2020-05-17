from django.contrib import admin
from deckviewer.decks.models import Deck, Card, DeckCard, Player, PlayerCard


class DeckCardInline(admin.TabularInline):  # pragma: no cover just config
    """Define an inline to edit the DeckCards belonging to the deck."""
    model = DeckCard

    autocomplete_fields = ['card']


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):  # pragma: no cover just config
    """Custom definition for Card Admin."""

    search_fields = ['name']
    inlines = [DeckCardInline]


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):  # pragma: no cover just config
    """Custom definition for Deck Admin."""

    inlines = [DeckCardInline]

    # def tenant_agreements_str(self, obj: Lease) -> List[str]:  # pragma: no cover
    #     return [str(t.tenant) for t in obj.tenant_agreements.all()]
    # list_display = ('__str__', 'tenant_agreements_str')
    # list_filter = (LeaseStatusListFilter, )


admin.site.register(DeckCard)
admin.site.register(Player)
admin.site.register(PlayerCard)
