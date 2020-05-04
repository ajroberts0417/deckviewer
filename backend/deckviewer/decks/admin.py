from django.contrib import admin
from deckviewer.decks.models import Deck, Card, DeckCard, Player

# Register your models here.
admin.site.register(Deck)
admin.site.register(Card)
admin.site.register(DeckCard)
admin.site.register(Player)