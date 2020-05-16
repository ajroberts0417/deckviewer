from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.


class Card(models.Model):

    CLASS_CHOICES = [
        ('neutral', 'Neutral'),
        ('wizard', 'Wizard'),
        ('fighter', 'Fighter'),
        ('ranger', 'Ranger'),
        ('cleric', 'Cleric'),
    ]

    TYPE_CHOICES = [
        ('permanent', 'Permanent'),
        ('reaction', 'Reaction'),
        ('action', 'Action'),
    ]

    airtable_id = models.CharField(max_length=100, blank=True, null=True)
    card_type = models.CharField(max_length=100, choices=TYPE_CHOICES)
    class_type = models.CharField(max_length=100, choices=CLASS_CHOICES)
    cost = models.IntegerField()
    designer = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    range = models.CharField(max_length=100)
    rules_text = models.TextField()

    def __str__(self):
        return self.name


class DeckCard(models.Model):
    deck = models.ForeignKey("Deck", on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.deck) + " - " + str(self.card)


class Player(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)


class PlayerCard(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.player.user) + " - " + str(self.card)


class Deck(models.Model):

    airtable_id = models.CharField(max_length=100, blank=True, null=True)
    name = models.CharField(max_length=100)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name
