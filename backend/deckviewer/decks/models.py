from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.


class Card(models.Model):
    name = models.CharField(max_length=100)

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
    name = models.CharField(max_length=100)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.name
