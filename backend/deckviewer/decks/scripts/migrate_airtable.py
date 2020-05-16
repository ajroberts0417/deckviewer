from airtable import Airtable

from deckviewer.decks.models import Deck, Card, DeckCard

airtable_card = Airtable('appr7aUJe07RDR9Ho', 'Card')
airtable_deck = Airtable('appr7aUJe07RDR9Ho', 'Deck')
airtable_dc = Airtable('appr7aUJe07RDR9Ho', 'DeckCard')  # for DeckCard table


# Migrate Decks
decks = airtable_deck.get_all(view='Grid view')

deck_batch = [Deck(airtable_id=deck.get("id"), name=deck['fields'].get('Name')) for deck in decks]
Deck.objects.bulk_create(deck_batch)


# Migrate Cards
cards = airtable_card.get_all(view='Grid view')

card_batch = [
    Card(
        airtable_id=card.get("id"),
        card_type=card["fields"].get("card type"),
        class_type=card["fields"].get("class"),
        cost=card["fields"].get("cost"),
        designer=card["fields"].get("designer")[0].get('email'),
        name=card['fields'].get('Name'),
        range=card['fields'].get('range'),
        rules_text=card["fields"].get("rules text"),
    )
    for card in cards
]
Card.objects.bulk_create(card_batch)

# Migrate DeckCards
deckcards = airtable_dc.get_all(view='Edit View')

cards = Card.objects.all()
decks = Deck.objects.all()

deckcard_batch = [
    DeckCard(
        card=cards.get(airtable_id=dc["fields"].get("Card")[0]),
        deck=decks.get(airtable_id=dc["fields"].get("Deck")[0])
    )
    for dc in deckcards
]
DeckCard.objects.bulk_create(deckcard_batch)
