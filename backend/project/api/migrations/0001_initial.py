# Generated by Django 4.2.6 on 2024-06-26 08:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Researcher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('specialty', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ResearchProject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('start_date', models.DateField()),
                ('expected_end_date', models.DateField()),
                ('project_leader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.researcher')),
                ('researchers', models.ManyToManyField(related_name='projects', to='api.researcher')),
            ],
        ),
        migrations.CreateModel(
            name='Publication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('abstract', models.TextField()),
                ('publication_date', models.DateField()),
                ('associated_project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.researchproject')),
            ],
        ),
    ]
