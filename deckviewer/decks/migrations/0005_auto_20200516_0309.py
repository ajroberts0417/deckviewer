# Generated by Django 3.1a1 on 2020-05-16 03:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("decks", "0004_playercard"),
    ]

    operations = [
        migrations.AddField(
            model_name="card",
            name="airtable_id",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="card",
            name="card_type",
            field=models.CharField(
                choices=[
                    ("permanent", "Permanent"),
                    ("reaction", "Reaction"),
                    ("action", "Action"),
                ],
                default="action",
                max_length=100,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="card",
            name="class_type",
            field=models.CharField(
                choices=[
                    ("neutral", "Neutral"),
                    ("wizard", "Wizard"),
                    ("fighter", "Fighter"),
                    ("ranger", "Ranger"),
                    ("cleric", "Cleric"),
                ],
                default="default",
                max_length=100,
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="card",
            name="cost",
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="card",
            name="designer",
            field=models.CharField(default="", max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="card",
            name="range",
            field=models.CharField(default="", max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="card",
            name="rules_text",
            field=models.TextField(default=""),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="deck",
            name="airtable_id",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
